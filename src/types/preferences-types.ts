import { WordCount, WordsPopularity } from "@/types/typing-types";

export type ThemeName =
  | "violet"
  | "emerald"
  | "blue"
  | "indigo"
  | "teal";

export type Theme = {
  themeClassName: string;
  primaryColor: string;
};
export type PreferenceState = {
  wordCount: WordCount;
  popularity: WordsPopularity;
  theme: Theme;
};

export type PreferenceActions = {
  actions: {
    changeWordCount: (wordCount: WordCount) => void;
    changeWordPopularity: (wordsPopularity: WordsPopularity) => void;
    changeTheme: (name: ThemeName) => void;
  };
};
