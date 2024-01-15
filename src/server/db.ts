import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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

async function uplaodRecord(
  user: string,
  wordsPerMin: number,
  accuracy: number,
  timeTaken: number,
  wordCount: number,
  WordsPopularity: string,
  points: number
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
      points,
    };
    await addDoc(leaderboardRef, data);
    console.log("Data written to leaderboard successfully!");
  } catch (error) {
    console.error("Error writing data to leaderboard:", error);
  }
}

async function updateExistingRecord(
  userID: string,
  wordsPerMin: number,
  accuracy: number,
  timeTaken: number,
  wordCount: number,
  WordsPopularity: string,
  points: number
) {
  try {
    const leaderboardRef = collection(db, "leaderboard");
    const q = query(leaderboardRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(leaderboardRef, querySnapshot.docs[0].id);
      const data = {
        user: userID,
        wordsPerMin,
        accuracy,
        timeTaken,
        wordCount,
        WordsPopularity,
        points,
      };
      await setDoc(docRef, data, { merge: true });
      console.log("Data updated in leaderboard successfully!");
    } else {
      console.log("No existing record found to update");
    }
  } catch (error) {
    console.error("Error updating data in leaderboard:", error);
  }
}

async function doesUserExists(userId: string) {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, where("user", "==", userId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function isHigherScore(userId: string, newPoints: number) {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, where("user", "==", userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const existingPoints = querySnapshot.docs[0].data().points;
    return newPoints > existingPoints;
  }

  return false;
}


function readLeaderboard(callback: (data: object[]) => void) {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const leaderboardData: object[] = [];
      snapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });
      callback(leaderboardData);
    },
    (error) => {
      console.error("Error reading data from leaderboard:", error);
    }
  );

  return unsubscribe;
}

export {
  app,
  auth,
  doesUserExists,
  db,
  isHigherScore,
  readLeaderboard,
  updateExistingRecord,
  uplaodRecord,
};
