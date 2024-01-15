type CalculateAccuracy = {
  words: string[];
  mistakesCount: number;
};

export const calculateAccuracy = ({
  words,
  mistakesCount,
}: CalculateAccuracy) => {
  const totalCharacters = words.reduce(
    (acc, word) => acc + word.length,
    0
  );

  const correctCharacters = totalCharacters - mistakesCount;
  const accuracyPercentage = Math.round(
    (correctCharacters / totalCharacters) * 100
  );

  return accuracyPercentage > 0 ? accuracyPercentage : 0;
};

type CalculateWPM = {
  words: string[];
  start: null | number;
  end: number;
};

export const calculateWPM = ({ words, start, end }: CalculateWPM) => {
  if (!start) return 0;

  const wordCount = words.length;

  const elapsedMinutes = (end - start) / 60_000;

  const wpm = Math.round(wordCount / elapsedMinutes);

  return wpm;
};

type CalculateTime = {
  start: null | number;
  end: number;
};

export const calculateElapsedSeconds = ({
  start,
  end,
}: CalculateTime) => {
  if (!start) return 0;
  return Math.round((end - start) / 1000);
};

export const calculateScore = (wpm: any, accuracy: any, WordsPopularity: any) => {
  if (typeof wpm !== "number" || typeof accuracy !== "number" || typeof WordsPopularity !== "number") {
    return 0; // or some other default value
  }

  if (wpm <= 0) {
    return 0; // Prevent division by zero or negative popularity
  }

  const baseScore = wpm * (accuracy / 100);
  const difficultyAdjustment = 1000 / WordsPopularity;
  return baseScore * difficultyAdjustment;
};

export function getSortFunction(sortColumn: string, sortDirection: string) {
  return (a: any, b: any) => {
    if (sortColumn in a && sortColumn in b) {
      return sortDirection === "asc"
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }
    return 0;
  };
}
