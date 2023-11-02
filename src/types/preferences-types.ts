import { WordCount, WordsPopularity } from "@/types/typing-types";
import { ThemeName } from "@/data/themes";

export type Theme = {
  themeClassName: string;
  primaryColor: string;
};

export type TextPosition = "left" | "center";

export type PreferenceState = {
  wordCount: WordCount;
  popularity: WordsPopularity;
  theme: Theme;
  textPosition: TextPosition;
};

export type PreferenceActions = {
  actions: {
    changeWordCount: (wordCount: WordCount) => void;
    changeWordPopularity: (wordsPopularity: WordsPopularity) => void;
    changeTheme: (name: ThemeName) => void;
    changeTextPosition: (textPosition: TextPosition) => void;
  };
};
