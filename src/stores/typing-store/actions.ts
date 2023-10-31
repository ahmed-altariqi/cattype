import {
  ChartDataPoint,
  TypingActions,
  TypingState,
  WordListCharAndStatus,
} from "@/types/typing-types";

import {
  calculateAccuracy,
  calculateElapsedSeconds,
  calculateWPM,
} from "@/lib/math";

import {
  initializeTypingState,
  typingStore,
} from "@/stores/typing-store";

const ONE_SECOND_INTERVAL = 1000;

// Define a type alias for the 'set' function used to update state
type Set = (
  partial:
    | (TypingState & TypingActions)
    | Partial<TypingState & TypingActions>
    | ((
        state:
          | (TypingState & TypingActions)
          | Partial<TypingState & TypingActions>
      ) => TypingState & TypingActions)
) => void;

export const initializeTypingActions = (set: Set): TypingActions => {
  const startTest = (key: string) => {
    const { actions } = typingStore.getState();

    // Set up a recurring interval to update chart data points every second
    const intervalRef = setInterval(
      actions.updateChartDataPoints,
      ONE_SECOND_INTERVAL
    );

    set({
      status: "typing",
      startTime: Date.now(),
      chartPointStartTime: Date.now(),
      intervalRef,
    });

    // Process the first key stroke
    actions.keyStroke(key);
  };

  const finishTest = () => {
    const {
      words,
      startTime,
      mistakesCount,
      intervalRef,
      chartPointTypedWords,
      chartPointMistakeCount,
      actions,
    } = typingStore.getState();

    // Calculate accuracy, WPM, and test duration
    const accuracy = calculateAccuracy({
      words,
      mistakesCount,
    });
    const wpm = calculateWPM({
      words,
      start: startTime,
      end: Date.now(),
    });
    const durationInSeconds = calculateElapsedSeconds({
      start: startTime,
      end: Date.now(),
    });

    // Clear the interval for updating chart data points
    if (intervalRef) {
      actions.clearChartInterval(intervalRef);
    }

    // Update chart data points if there are pending changes
    if (chartPointMistakeCount || chartPointTypedWords.length) {
      actions.updateChartDataPoints();
    }

    // Set final state for the typing test
    set({
      accuracy,
      wpm,
      durationInSeconds,
      status: "done",
    });
  };

  const updateChartDataPoints = () => {
    const {
      charPoints,
      chartPointStartTime,
      chartPointTypedWords,
      chartPointMistakeCount,
    } = typingStore.getState();

    // Calculate WPM and accuracy for the current chart data point
    const wpm = calculateWPM({
      words: chartPointTypedWords,
      start: chartPointStartTime,
      end: Date.now(),
    });
    const acc = calculateAccuracy({
      words: chartPointTypedWords,
      mistakesCount: chartPointMistakeCount,
    });

    // Create a new chart data point and update the state
    const newCharPoint: ChartDataPoint = {
      acc: acc,
      wpm,
      mistakesCount: chartPointMistakeCount,
    };

    set({
      charPoints: [...charPoints, newCharPoint],
      chartPointTypedWords: [],
      chartPointMistakeCount: 0,
      chartPointStartTime: Date.now(),
    });
  };

  const reset = () => {
    const { intervalRef, actions } = typingStore.getState();

    // Make sure to clear the interval before we reset our typing store.
    if (intervalRef) {
      actions.clearChartInterval(intervalRef);
    }

    set(initializeTypingState());
  };

  const clearChartInterval = (intervalRef: NodeJS.Timeout) => {
    clearInterval(intervalRef);
  };

  const keyStroke = (key: string) => {
    const {
      words,
      activeWordIndex,
      activeCharacterIndex,
      wordListCharAndStatus,
    } = typingStore.getState();

    // Get the current word and its characters and status
    const currentWord = words[activeWordIndex];
    const currentCharactersAndStatus =
      wordListCharAndStatus[activeWordIndex];

    // Handle backspace key press
    const isBackspace = key === "Backspace";
    if (
      isBackspace &&
      activeCharacterIndex > 0 &&
      currentCharactersAndStatus.length <= currentWord.length
    ) {
      handleBackspace();
      return;
    }

    if (isBackspace) return;

    // Check if the pressed key is correct and if a space should be clicked to jump to the next word
    const isCorrectKey = key === currentWord[activeCharacterIndex];
    const shouldClickSpace =
      activeCharacterIndex === currentWord.length;

    // Handle key press based on whether a space should be clicked
    if (shouldClickSpace) {
      handleSpaceKey({ key, isSpace: key === " " });
    } else {
      handleNonSpaceKey({ isCorrectKey });
    }

    // Update the active character index only if shouldClickSpace is false to avoid going out of bounds.
    if (!shouldClickSpace) {
      set({ activeCharacterIndex: activeCharacterIndex + 1 });
    }

    // handle the last character of the last word
    handleLastCharacter();
  };

  const handleBackspace = () => {
    const { activeCharacterIndex } = typingStore.getState();
    set({
      activeCharacterIndex: activeCharacterIndex - 1,
      wordListCharAndStatus: getNewWordListCharAndStatus({
        charStatus: "INACTIVE",
        isBackspace: true,
      }),
    });
    return;
  };

  const handleSpaceKey = ({
    key,
    isSpace,
  }: {
    key: string;
    isSpace: boolean;
  }) => {
    const {
      words,
      activeWordIndex,
      chartPointTypedWords,
      mistakesCount,
      chartPointMistakeCount,
    } = typingStore.getState();

    // Handle space key press by moving to the next word or registering a mistake
    if (isSpace) {
      set({
        activeWordIndex: activeWordIndex + 1,
        activeCharacterIndex: 0,
        chartPointTypedWords: [
          ...chartPointTypedWords,
          words[activeWordIndex],
        ],
      });
    } else {
      set({
        mistakesCount: mistakesCount + 1,
        chartPointMistakeCount: chartPointMistakeCount + 1,
        wordListCharAndStatus: getNewWordListCharAndStatus({
          char: key,
          charStatus: "INCORRECT",
        }),
      });
    }
    return;
  };

  const handleNonSpaceKey = ({
    isCorrectKey,
  }: {
    isCorrectKey: boolean;
  }) => {
    const { mistakesCount, chartPointMistakeCount } =
      typingStore.getState();

    if (isCorrectKey) {
      set({
        wordListCharAndStatus: getNewWordListCharAndStatus({
          charStatus: "CORRECT",
        }),
      });
    } else {
      set({
        mistakesCount: mistakesCount + 1,
        chartPointMistakeCount: chartPointMistakeCount + 1,
        wordListCharAndStatus: getNewWordListCharAndStatus({
          charStatus: "INCORRECT",
        }),
      });
    }
  };

  const handleLastCharacter = () => {
    const { activeWordIndex, words, activeCharacterIndex, actions } =
      typingStore.getState();

    const isLastWord = activeWordIndex === words.length - 1;
    const isLastCharacter =
      isLastWord &&
      activeCharacterIndex === words[activeWordIndex].length;

    // Finish the test if it's the last character of the last word
    if (isLastCharacter) {
      actions.finishTest();
    }
  };

  const getNewWordListCharAndStatus = ({
    char,
    charStatus,
    isBackspace,
  }: {
    char?: string;
    charStatus: "INACTIVE" | "CORRECT" | "INCORRECT";
    isBackspace?: boolean;
  }): WordListCharAndStatus => {
    const {
      wordListCharAndStatus,
      activeWordIndex,
      activeCharacterIndex,
    } = typingStore.getState();

    return wordListCharAndStatus.map((word, wordIndex) => {
      return char && wordIndex === activeWordIndex
        ? [...word, { char, charStatus }]
        : word.map((charAndStatus, charIndex) => {
            if (isBackspace && wordIndex === activeWordIndex) {
              if (
                charIndex === activeCharacterIndex ||
                charIndex === activeCharacterIndex - 1
              ) {
                return {
                  ...charAndStatus,
                  charStatus: "INACTIVE",
                };
              }
            }

            return wordIndex === activeWordIndex &&
              charIndex === activeCharacterIndex
              ? { ...charAndStatus, charStatus }
              : charAndStatus;
          });
    });
  };

  return {
    actions: {
      startTest,
      keyStroke,
      finishTest,
      updateChartDataPoints,
      clearChartInterval,
      reset,
    },
  };
};
