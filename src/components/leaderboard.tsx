import { useEffect, useState } from "react";
import { readFromLeaderboard } from "@/firebase/firebase";

interface LeaderboardItem {
  wordCount: number;
  accuracy: number;
  WordsPopularity: string;
  wordsPerMin: number;
  timeTaken: number; // Add the 'timeTaken' property
}

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]); // Provide the correct type

  useEffect(() => {
    const fetchData = async () => {
      const data = await readFromLeaderboard();
      setLeaderboardData(data as LeaderboardItem[]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboardData.map((item, index) => (
          <li key={index}>
            <p>Word Count: {item.wordCount}</p>
            <p>{item.accuracy}%</p>
            <p>Words Popularity: {item.WordsPopularity}</p>
            <p>WPM{item.wordsPerMin}</p>
            <p>{item.timeTaken}s</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
