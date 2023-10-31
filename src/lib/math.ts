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
