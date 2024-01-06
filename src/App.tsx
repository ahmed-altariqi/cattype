import { cn } from "@/lib/utils";
import { useState } from "react";

import { useTheme } from "@/stores/preferences-store";
import { useStatus } from "@/stores/typing-store";

import { Logo } from "@/components/logo";
import { PreferencesModal } from "@/components/preferences-modal";
import { Statistics } from "@/components/statistics";
import { TypingArea } from "@/components/typing-area";
import { Toaster } from "@/components/ui/toaster";

import { auth } from "@/firebase/firebase";
import { signInAnonymously } from "firebase/auth";
import { useEffect } from "react";


const App = () => {
  const status = useStatus();
  const { themeClassName } = useTheme();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in anonymously");
        setUserID(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Anonymous auth error:", errorCode, errorMessage);
      });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        console.log("User is signed in:", userID);
      } else {
        console.log("User is signed out");
        setUserID("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <div className={cn("bg-cat-background text-cat-muted overflow-hidden", themeClassName)}>
        <div className="container pt-10 h-screen">
          <div className="max-w-7xl flex flex-col md:px-40 min-h-screen text-2xl font-bold">
            <div className="flex items-center justify-between">
              <Logo />
              <PreferencesModal />
            </div>
            <div className="pt-10">
              {status === "done" ? (
                <Statistics userID={userID} />
              ) : (
                <TypingArea />
              )}
            </div>
          </div>
          <Toaster />
        </div>
      </div>
  );
};

export default App;
