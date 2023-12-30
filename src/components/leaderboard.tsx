import { useEffect, useState } from "react";
import { readFromLeaderboard } from "@/firebase/firebase";

interface LeaderboardItem {
  wordCount: number;
  accuracy: number;
  WordsPopularity: number; // Assuming WordsPopularity is a numeric value representing difficulty
  wordsPerMin: number;
  timeTaken: number;
}

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readFromLeaderboard();
      setLeaderboardData(data as LeaderboardItem[]);
    };

    fetchData();
  }, []);

  // Calculate score based on WPM, accuracy, and words popularity
  const calculateScore = (item: LeaderboardItem) => {
    const baseScore = item.wordsPerMin * (item.accuracy / 100);
    // Adjust the score by the inverse of words popularity assuming lower popularity means higher difficulty
    const difficultyAdjustment = 1000 / item.WordsPopularity;
    return baseScore * difficultyAdjustment;
  };

  const sortedData = leaderboardData
    .filter(item => item.wordsPerMin && item.accuracy) // Filter out items with null or empty values
    .map(item => ({
      ...item,
      score: calculateScore(item), // Calculate adjusted score
    }))
    .sort((a, b) => b.score - a.score); // Sort by the calculated score

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-black text-4xl py-4 text-white">
        Leaderboard
      </h1>
      <ul className="items-center">
        {sortedData.map((item, index) => (
          <li key={index} className="flex flex-1 gap-6 py-3 text-center">
            <p>WPM: {item.wordsPerMin}</p>
            <p>Accuracy: {item.accuracy}%</p>
            <p>Time: {item.timeTaken}s</p>
            <p>Count: {item.wordCount}</p>
            <p>Words Popularity: {item.WordsPopularity}</p>
            <p>Score: {item.score.toFixed(0)} pts</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
