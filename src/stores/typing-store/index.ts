import { create } from "zustand";

import {
  TypingActions,
  TypingState,
  WordListCharAndStatus,
} from "@/types/typing-types";

import { randomizedWords } from "@/data/words/index";

import { usePreferenceStore } from "@/stores/preferences-store";
import { initializeTypingActions } from "@/stores/typing-store/actions";

const initializeWordListCharacterStatus = (
  words: string[],
): WordListCharAndStatus =>
  words.map((word) =>
    word.split("").map((char) => ({ char, charStatus: "INACTIVE" })),
  );

export const initializeTypingState = (): TypingState => {
  const { wordCount, popularity } = usePreferenceStore.getState();
  const words = randomizedWords({ wordCount, popularity });

  return {
    words,
    status: "idle",
    mistakesCount: 0,
    activeWordIndex: 0,
    activeCharacterIndex: 0,
    wordListCharAndStatus: initializeWordListCharacterStatus(words),

    startTime: null,
    accuracy: null,
    wpm: null,
    durationInSeconds: 0,

    chartPointStartTime: null,
    chartPointMistakeCount: 0,
    chartPointTypedWords: [],
    charPoints: [],

    intervalRef: null,
  };
};

export const typingStore = create<TypingState & TypingActions>((set) => ({
  ...initializeTypingState(),
  ...initializeTypingActions(set),
}));

export const useWords = () => typingStore((state) => state.words);
export const useStatus = () => typingStore((state) => state.status);
export const useActiveWordIndex = () =>
  typingStore((state) => state.activeWordIndex);
export const useActiveCharacterIndex = () =>
  typingStore((state) => state.activeCharacterIndex);

export const useWordListCharAndStatus = () =>
  typingStore((state) => state.wordListCharAndStatus);

export const useMistakesCount = () =>
  typingStore((state) => state.mistakesCount);

export const useAccuracy = () => typingStore((state) => state.accuracy);
export const useWPM = () => typingStore((state) => state.wpm);
export const useDuration = () =>
  typingStore((state) => state.durationInSeconds);

export const useChartPoints = () => typingStore((state) => state.charPoints);

export const useTypingActions = () => typingStore((state) => state.actions);
