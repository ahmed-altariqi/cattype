import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore"; 
import { getDocs } from "firebase/firestore"; 

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
async function updateLeaderboard(
  userID: string,
  wordsPerMin: number,
  accuracy: number,
  timeTaken: number,
  wordCount: number,
  WordsPopularity: string
) {
  try {
    const leaderboardRef = collection(db, "leaderboard");
    const data = {
      user: userID,
      wordsPerMin,
      accuracy,
      timeTaken,
      wordCount,
      WordsPopularity,
    };
    await setDoc(doc(leaderboardRef, userID), data, { merge: true });
    console.log("Data updated in leaderboard successfully!");
  } catch (error) {
    console.error("Error updating data in leaderboard:", error);
  }
}

async function readFromLeaderboard(userID: string) {
  try {
    const leaderboardRef = collection(db, "leaderboard");
    const snapshot = await getDocs(leaderboardRef);
    const leaderboardData: object[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.userID = userID;
      leaderboardData.push(data);
    });
    return leaderboardData;
  } catch (error) {
    console.error("Error reading data from leaderboard:", error);
    return [];
  }
}

// async function getUserFromLeaderboard

export { app, auth, db, writeToLeaderboard, readFromLeaderboard, updateLeaderboard };
