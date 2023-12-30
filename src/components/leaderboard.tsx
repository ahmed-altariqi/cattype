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
import { calculateScore, getSortFunction } from "@/lib/math";

//TODO: Infinite Scroll leaderboard, Reset Sorting 
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
    .sort(getSortFunction(sortColumn, sortDirection));

  return (
    <div className="flex flex-col py-5">
      <h1
        className={cn("text-left font-black text-5xl py-6", "text-cat-primary")}
      >
        Leaderboard
      </h1>
      <div className="overflow-ellipsis">
        <Table className="">
          <TableCaption>
            New high scores will update your existing record.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[50px]  text-center"
                onClick={() => handleSort("wordsPerMin")}
              >
                WPM{" "}
                {sortColumn === "wordsPerMin" && (
                  <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                )}
              </TableHead>
              <TableHead
                className="w-[50px]  text-center "
                onClick={() => handleSort("accuracy")}
              >
                Accuracy{" "}
                {sortColumn === "accuracy" && (
                  <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                )}
              </TableHead>
              <TableHead
                className="w-[50px] text-center"
                onClick={() => handleSort("timeTaken")}
              >
                Time{" "}
                {sortColumn === "timeTaken" && (
                  <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                )}
              </TableHead>
              <TableHead
                className="w-[50px] text-center"
                onClick={() => handleSort("wordCount")}
              >
                Words{" "}
                {sortColumn === "wordCount" && (
                  <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                )}
              </TableHead>
              <TableHead
                className="w-[50px] text-center"
                onClick={() => handleSort("WordsPopularity")}
              >
                Popularity{" "}
                {sortColumn === "WordsPopularity" && (
                  <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                )}
              </TableHead>
              <TableHead
                className="w-[50px] text-center"
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
              <TableRow key={index} className="text-center">
                <TableCell>{item.wordsPerMin}</TableCell>
                <TableCell>{item.accuracy}%</TableCell>
                <TableCell>{item.timeTaken}s</TableCell>
                <TableCell>{item.wordCount}</TableCell>
                <TableCell>{item.WordsPopularity}</TableCell>
                <TableCell>{item.score.toFixed(0)}pts</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Leaderboard;
