import { WordCount } from "@/types";

import { list } from "./words";

type Popularity = 200 | 1000 | 5_000 | 10_000 | 20_000;
type RandomizedWords = {
  wordCount?: WordCount;
  popularity?: Popularity;
};

export const randomizedWords = ({
  wordCount = 10,
  popularity = 200,
}: RandomizedWords) => {
  const wordList = list.slice(0, popularity);

  const words = Array.from(
    { length: wordCount },
    () => wordList[Math.floor(Math.random() * wordList.length)]
  );

  return words;
};
