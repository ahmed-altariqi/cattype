import { create } from "zustand";

import {
  PreferenceActions,
  PreferenceState,
} from "@/types/preferences-types";

import { getThemeClassNameAndPrimaryColor } from "@/data/themes";

export const usePreferenceStore = create<
  PreferenceState & PreferenceActions
>()((set) => ({
  wordCount: 10,
  popularity: 200,
  theme: {
    themeClassName: "theme-teal",
    primaryColor: "171, 77%, 64%",
  },
  actions: {
    changeWordCount: (wordCount) => {
      set({ wordCount });
    },
    changeWordPopularity: (popularity) => {
      set({ popularity });
    },
    changeTheme: (name) => {
      set({ theme: getThemeClassNameAndPrimaryColor(name) });
    },
  },
}));

export const useWordCount = () =>
  usePreferenceStore((s) => s.wordCount);
export const useWordsPopularity = () =>
  usePreferenceStore((s) => s.popularity);
export const useTheme = () => usePreferenceStore((s) => s.theme);
export const usePreferenceActions = () =>
  usePreferenceStore((s) => s.actions);
