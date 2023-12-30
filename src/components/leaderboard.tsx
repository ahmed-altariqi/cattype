import { useEffect, useState } from "react";
import { readFromLeaderboard } from "@/firebase/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface LeaderboardItem {
  uesr: string;
  wordCount: number;
  accuracy: number;
  WordsPopularity: number;
  wordsPerMin: number;
  timeTaken: number;
}

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      const data = await readFromLeaderboard();
      setLeaderboardData(data as LeaderboardItem[]);
    };

    fetchData();
  }, []);

  const calculateScore = (item: LeaderboardItem) => {
    const baseScore = item.wordsPerMin * (item.accuracy / 100);
    const difficultyAdjustment = 1000 / item.WordsPopularity;
    return baseScore * difficultyAdjustment;
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = leaderboardData
    .filter((item) => item.wordsPerMin && item.accuracy)
    .map((item) => ({
      ...item,
      score: calculateScore(item),
    }))
    .sort((a, b) => {
      if (sortColumn === "wordsPerMin") {
        return sortDirection === "asc"
          ? a.wordsPerMin - b.wordsPerMin
          : b.wordsPerMin - a.wordsPerMin;
      } else if (sortColumn === "accuracy") {
        return sortDirection === "asc"
          ? a.accuracy - b.accuracy
          : b.accuracy - a.accuracy;
      } else if (sortColumn === "timeTaken") {
        return sortDirection === "asc"
          ? a.timeTaken - b.timeTaken
          : b.timeTaken - a.timeTaken;
      } else if (sortColumn === "wordCount") {
        return sortDirection === "asc"
          ? a.wordCount - b.wordCount
          : b.wordCount - a.wordCount;
      } else if (sortColumn === "WordsPopularity") {
        return sortDirection === "asc"
          ? a.WordsPopularity - b.WordsPopularity
          : b.WordsPopularity - a.WordsPopularity;
      } else if (sortColumn === "score") {
        return sortDirection === "asc" ? a.score - b.score : b.score - a.score;
      } else {
        return 0;
      }
    });

  return (
    <div className="flex flex-col py-5">
      <h1 className={cn("text-left font-black text-5xl py-6", "text-cat-primary")}>Leaderboard</h1>
      <Table className="text-xl">
        <TableCaption>
          New high scores will update your existing record.
        </TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("wordsPerMin")}
            >
              WPM{" "}
              {sortColumn === "wordsPerMin" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("accuracy")}
            >
              Accuracy{" "}
              {sortColumn === "accuracy" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("timeTaken")}
            >
              Time{" "}
              {sortColumn === "timeTaken" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("wordCount")}
            >
              Words{" "}
              {sortColumn === "wordCount" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("WordsPopularity")}
            >
              Popularity{" "}
              {sortColumn === "WordsPopularity" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
            <TableHead
              className="w-[550px] "
              onClick={() => handleSort("score")}
            >
              Score{" "}
              {sortColumn === "score" && (
                <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.wordsPerMin}</TableCell>
              <TableCell>{item.accuracy}%</TableCell>
              <TableCell>{item.timeTaken}s</TableCell>
              <TableCell>{item.wordCount}</TableCell>
              <TableCell>{item.WordsPopularity}</TableCell>
              <TableCell>{item.score.toFixed(0)} pts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Leaderboard;
