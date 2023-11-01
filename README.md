# cat see cattype 😸

## Technologies used to build `cattype`:

- React with TypeScript.
- Tailwindcss for styling.
- Zustand for state management.
- shadcn/ui for reusable components.
- react-chartjs-2 & chart.js, well for the chart.

## Why Zustand?

I built my project around Zustand to learn it effectively and because I wanted to use a state management library that was lightweight, easy-to-use, and because I like using hooks to access my state.

### Preferences Store:

`Preferences Store`, manages user preferences such as theme, word count, and word popularity. It also provides actions to update each preference.

#### Initial Preferences Setup:

```javascript
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
    }),
    {
      name: "__cattype_preferences__",
      partialize: (state) => ({
        wordCount: state.wordCount,
        popularity: state.popularity,
        theme: state.theme,
      }),
    }
  )
);
```

The `usePreferenceStore` is returned from invoking Zustand's `create` function, incorporating the initial state and actions. It uses the `persist` middleware to store user preferences in localStorage.

#### Selectors:

Several selectors are defined to efficiently access specific pieces of the `preferencesStore` state:

- `useWordCount`
- `useWordsPopularity`
- `useTheme`
- `usePreferenceActions`

These selectors allow components to easily retrieve and react to changes in specific preferences from the `preferencesStore`.

### Typing Store

`Typing Store` serves as the bulk of the project, managing the application's state related to the typing test. Let's delve into the key concepts and properties:

#### Initial State Setup:

```javascript
const initializeWordListCharacterStatus = (
  words: string[]
): WordListCharAndStatus =>
  words.map((word) =>
    word.split("").map((char) => ({ char, charStatus: "INACTIVE" }))
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
```

This function, `initializeTypingState`, sets up the initial state for the `typingStore`. It calculates the initial word list based on user preferences and initializes various properties required for tracking the typing session.

This function, `initializeWordListCharacterStatus`, takes an array of words as input and returns an array of objects. Each object represents a character in the word, along with its status. The status of each character is initially set to "INACTIVE".The word list is displayed, and the status of each character is updated to reflect its current state (i. e INACTIVE, CORRECT or INCORRECT).

#### `typingStore` Creation:

```javascript
export const typingStore =
  (create < TypingState) &
  (TypingActions >
    ((set) => ({
      ...initializeTypingState(),
      ...initializeTypingActions(set),
    })));
```

The `typingStore` is created using Zustand's `create` function, incorporating the initial state and actions provided by `initializeTypingState` and `initializeTypingActions` functions, respectively.

#### Selectors:

Several selectors are defined to efficiently access specific pieces of the `typingStore` state. For example:

- `useWords`
- `useStatus`
- `useActiveWordIndex`
- `useActiveCharacterIndex`
- `useWordListCharAndStatus`
- `useMistakesCount`
- `useAccuracy`
- `useWPM`
- `useDuration`
- `useChartPoints`
