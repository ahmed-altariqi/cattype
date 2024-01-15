import { useEffect } from "react";

import { StatisticsChart } from "@/components/chart";
import {
  auth,
  checkIfUserExists,
  isHigherScore,
  updateLeaderboard,
  writeToLeaderboard,
} from "@/firebase/firebase";
import { calculateScore } from "@/lib/math";
import { cn } from "@/lib/utils";
import { useWordsPopularity } from "@/stores/preferences-store";
import {
  useAccuracy,
  useActiveWordIndex,
  useDuration,
  useTypingActions,
  useWPM,
} from "@/stores/typing-store";
import Leaderboard from "./leaderboard";

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

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [reset]);

  (async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log("No user ID found");
      return;
    }

    const points = calculateScore(wpm, accuracy, popularity);
    const userExists = await checkIfUserExists(userId);

    console.log("User exists:", userExists, "User ID:", userId);

    if (userExists) {
      const isHigher = await isHigherScore(userId, points);
      console.log("Is higher score:", isHigher);

      if (isHigher) {
        await updateLeaderboard(
          userId ?? "",
          wpm as number,
          accuracy as number,
          duration,
          wordCount,
          popularity.toString(),
          points
        );
        console.log("You beat your high score!");
      } else {
        console.log("Try again to beat your high score!");
      }
    } else {
      await writeToLeaderboard(
        userId ?? "",
        wpm as number,
        accuracy as number,
        duration,
        wordCount,
        popularity.toString(),
        points
      );
      console.log("New high score!");
    }
  })();

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
