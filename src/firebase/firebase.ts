import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import the necessary functions
import { getDocs } from "firebase/firestore"; // Import the getDocs function

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

async function writeToLeaderboard(
  user: string,
  wordsPerMin: number,
  accuracy: number,
  timeTaken: number,
  wordCount: number,
  WordsPopularity: string
) {
  try {
    const leaderboardRef = collection(db, "leaderboard");
    const data = {
      user,
      wordsPerMin,
      accuracy,
      timeTaken,
      wordCount,
      WordsPopularity,
    };
    await addDoc(leaderboardRef, data);
    console.log("Data written to leaderboard successfully!");
  } catch (error) {
    console.error("Error writing data to leaderboard:", error);
  }
}
async function readFromLeaderboard() {
  try {
    const leaderboardRef = collection(db, "leaderboard");
    const snapshot = await getDocs(leaderboardRef);
    const leaderboardData: object[] = [];
    snapshot.forEach((doc) => {
      leaderboardData.push(doc.data());
    });
    return leaderboardData;
  } catch (error) {
    console.error("Error reading data from leaderboard:", error);
    return [];
  }
}

export { app, auth, db, writeToLeaderboard, readFromLeaderboard };
