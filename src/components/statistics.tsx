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

  //TODO : remove uploading on refresh/use update instead of write

interface StatisticsProps {
  userID: string;
}

export const Statistics = ({ userID }: StatisticsProps) => {
  const accuracy = useAccuracy();
  const wpm = useWPM();
  const duration = useDuration();
  const wordCount = useActiveWordIndex();
  const popularity = useWordsPopularity();

  const { reset } = useTypingActions();

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        reset();
      }
    };

    const userId = auth.currentUser?.uid;

    writeToLeaderboard(
      userId || "",
      wpm ?? 0,
      accuracy ?? 0,
      duration ?? 0,
      wordCount + 1,
      popularity.toString()
    );

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [reset]);

  return (
    <div className="flex flex-col lg:grid grid-cols-12 grid-rows-12 gap-6">
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

      <div className="row-start-3 col-span-full items-center justify-center">
        <p
          className={cn(
            "justify-center text-center text-muted-foreground flex items-center gap-x-2 opacity-50 text-sm",
            "text-textColor"
          )}
        >
          <span>Click </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Enter</span>
          </kbd>{" "}
          <span>to go the next test.</span>
        </p>
        <Leaderboard userID={userID as any} />
      </div>
    </div>
  );
};
