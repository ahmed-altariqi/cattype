import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  PreferenceActions,
  PreferenceState,
} from "@/types/preferences-types";

import { getThemeClassNameAndPrimaryColor } from "@/data/themes";

export const usePreferenceStore = create<
  PreferenceState & PreferenceActions
>()(
  persist(
    (set) => ({
      wordCount: 10,
      popularity: 200,
      theme: {
        themeClassName: "theme-teal",
        primaryColor: "171, 77%, 64%",
      },
      textPosition: "left",
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
        changeTextPosition: (textPosition) => {
          set({ textPosition });
        },
      },
    }),
    {
      name: "__cattype_preferences__",
      partialize: (state) => ({
        wordCount: state.wordCount,
        popularity: state.popularity,
        theme: state.theme,
        textPosition: state.textPosition,
      }),
    }
  )
);

export const useWordCount = () =>
  usePreferenceStore((s) => s.wordCount);
export const useWordsPopularity = () =>
  usePreferenceStore((s) => s.popularity);
export const useTheme = () => usePreferenceStore((s) => s.theme);
export const usePreferenceActions = () =>
  usePreferenceStore((s) => s.actions);
export const useTextPosition = () =>
  usePreferenceStore((s) => s.textPosition);
