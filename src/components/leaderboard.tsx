import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSortFunction } from "@/lib/math";
import { cn } from "@/lib/utils";
import { readLeaderboard } from "@/server/db";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import "../index.css";
import { ScrollArea } from "./ui/scroll-area";

interface LeaderboardItem {
  user: string;
  wordCount: number;
  accuracy: number;
  WordsPopularity: number;
  wordsPerMin: number;
  timeTaken: number;
  points: number;
}
interface LeaderboardProps {
  userID: string;
}

function Leaderboard({ userID }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = readLeaderboard((newData) => {
      setLeaderboardData(newData as LeaderboardItem[]);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sortedData = leaderboardData
    .filter((item) => item.wordsPerMin && item.accuracy)
    .map((item) => ({
      ...item,
    }))
    .sort(getSortFunction(sortColumn, sortDirection));
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  return (
    <div className="flex flex-col py-5 select-none">
      <h1
        className={cn("text-left font-black text-4xl pt-6", "text-cat-primary")}
        onClick={() => {
          setSortColumn("");
          setSortDirection("asc");
        }}
      >
        Leaderboard{" "}
        {sortColumn && (
          <RotateCw className="inline-block  text-cat-primary cursor-pointer" />
        )}
      </h1>
      <p className="text-left text-sm py-2">
        New high scores will update your existing record.
      </p>
      {isLoading ? (
        <p className="text-center py-5">Loading...</p>
      ) : (
        <ScrollArea className="rounded-md whitespace-nowrap">
          <div className="max-h-[19.5rem] overflow-y-scroll">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[68px] gap-0 text-center cursor-pointer"
                    onClick={() => handleSort("wordsPerMin")}
                  >
                    WPM{" "}
                    {sortColumn === "wordsPerMin" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                  <TableHead
                    className="w-[50px]  text-center cursor-pointer "
                    onClick={() => handleSort("accuracy")}
                  >
                    Accuracy{" "}
                    {sortColumn === "accuracy" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                  <TableHead
                    className="w-[50px] text-center cursor-pointer"
                    onClick={() => handleSort("timeTaken")}
                  >
                    Time{" "}
                    {sortColumn === "timeTaken" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                  <TableHead
                    className="w-[50px] text-center cursor-pointer"
                    onClick={() => handleSort("wordCount")}
                  >
                    Words{" "}
                    {sortColumn === "wordCount" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                  <TableHead
                    className="w-[50px] text-center cursor-pointer"
                    onClick={() => handleSort("WordsPopularity")}
                  >
                    Popularity{" "}
                    {sortColumn === "WordsPopularity" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                  <TableHead
                    className="w-[50px] text-center cursor-pointer"
                    onClick={() => handleSort("points")}
                  >
                    Score{" "}
                    {sortColumn === "points" && (
                      <span>{sortDirection === "asc" ? "▼" : "▲"}</span>
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedData.map((item) => (
                  <TableRow
                    key={item.user}
                    className={cn(
                      `text-center  ${
                        item.user === userID
                          ? "text-cat-primary bg-muted/5"
                          : ""
                      }`,
                    )}
                  >
                    <TableCell>{item.wordsPerMin}</TableCell>
                    <TableCell>{item.accuracy}%</TableCell>
                    <TableCell>{item.timeTaken}s</TableCell>
                    <TableCell>{item.wordCount}</TableCell>
                    <TableCell>{item.WordsPopularity}</TableCell>
                    <TableCell>{item.points.toFixed(0)}pts</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

export default Leaderboard;
