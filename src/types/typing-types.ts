export type WordCount = 10 | 15 | 30 | 60;
export type WordsPopularity = 200 | 1_000 | 5_000 | 10_000 | 20_000;
export type Status = "idle" | "typing" | "done";
export type CharStatus = "INACTIVE" | "CORRECT" | "INCORRECT";

export type CharAndStatus = {
  char: string;
  charStatus: CharStatus;
};

export type WordListCharAndStatus = CharAndStatus[][];

export type ChartDataPoint = {
  acc: number;
  wpm: number;
  mistakesCount: number;
};

export type TypingState = {
  status: Status;
  words: string[];
  activeWordIndex: number;
  activeCharacterIndex: number;
  wordListCharAndStatus: WordListCharAndStatus;
  mistakesCount: number;

  startTime: null | number;
  accuracy: null | number;
  wpm: null | number;
  durationInSeconds: number;

  charPoints: ChartDataPoint[];
  chartPointStartTime: null | number;
  chartPointTypedWords: string[];
  chartPointMistakeCount: number;

  intervalRef: null | NodeJS.Timeout;
};

export type TypingActions = {
  actions: {
    startTest: (key: string) => void;
    keyStroke: (key: string) => void;
    finishTest: () => void;
    updateChartDataPoints: () => void;
    clearChartInterval: (intervalRef: NodeJS.Timeout) => void;
    reset: () => void;
  };
};
