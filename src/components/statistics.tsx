import { useEffect } from "react";

import { cn } from "@/lib/utils";

import {
  useAccuracy,
  useActiveWordIndex,
  useDuration,
  useTypingActions,
  useWPM,
} from "@/stores/typing-store";

import { StatisticsChart } from "@/components/chart";
import Leaderboard from "./leaderboard";
import { writeToLeaderboard } from "@/firebase/firebase";
import { auth } from "@/firebase/firebase";
import { useWordsPopularity } from "@/stores/preferences-store";

// Inside a React component
export const Statistics = () => {
  const accuracy = useAccuracy();
  const wpm = useWPM();
  const duration = useDuration();
  const wordCount = useActiveWordIndex();
  const popularity = useWordsPopularity();

  const { reset } = useTypingActions();

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        writeToLeaderboard(
          userId || "",
          Math.floor(Math.random() * 50),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 50),
          wordCount + 1,
          popularity.toString()
        );
      }
    };

    window.addEventListener("keydown", keydown);

    const userId = auth.currentUser?.uid;

    writeToLeaderboard(
      userId || "",
      wpm ?? 0,
      accuracy ?? 0,
      duration ?? 0,
      wordCount + 1,
      popularity.toString()
    );
    return () => window.removeEventListener("keydown", keydown);
  }, [reset]);

  return (
    <div className="flex flex-col lg:grid grid-cols-12 grid-rows-12  gap-6">
      <div className="flex flex-col gap-10 row-span-10 col-span-2 ">
        <div className="flex lg:flex-col gap-2 ">
          <span className="flex flex-col">
            <span className="text-2xl">wpm</span>
            <span className={cn("text-3xl lg:text-5xl", "text-cat-primary")}>
              {wpm}
            </span>
          </span>
          <span className="flex flex-col">
            <span className="text-2xl">acc</span>
            <span className={cn("text-3xl lg:text-5xl text-cat-primary")}>
              {accuracy}%
            </span>
          </span>

          <span className="flex flex-col">
            <span className="text-2xl">time</span>
            <span className={cn("text-3xl lg:text-5xl", "text-cat-primary")}>
              {duration}s
            </span>
          </span>
        </div>
      </div>

      <div className="row-span-10 col-span-10 row-start-1 col-start-3 max-h-[350px] text-muted-foreground opacity-60 ">
        <StatisticsChart />
      </div>

      <div className="row-start-3 col-span-full flex items-center justify-center">
        <Leaderboard />
      </div>
    </div>
  );
};
