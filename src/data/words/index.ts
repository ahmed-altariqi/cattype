import { WordCount, WordsPopularity } from "@/types/typing-types";

import { list } from "./words";

type RandomizedWords = {
  wordCount?: WordCount;
  popularity?: WordsPopularity;
};

export const randomizedWords = ({
  wordCount = 10,
  popularity = 200,
}: RandomizedWords) => {
  const wordList = list.slice(0, popularity);

  const words = Array.from(
    { length: wordCount },
    () => wordList[Math.floor(Math.random() * wordList.length)],
  );

  return words;
};
