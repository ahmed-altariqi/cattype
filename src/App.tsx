import { cn } from "@/lib/utils";

import { useStatus } from "@/stores/typing-store";
import { useTheme } from "@/stores/preferences-store";

import { Logo } from "@/components/logo";
import { TypingArea } from "@/components/typing-area";
import { Statistics } from "@/components/statistics";
import { PreferencesModal } from "@/components/preferences-modal";
import { Toaster } from "@/components/ui/toaster";

import { auth } from "@/firebase/firebase";
import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";

const App = () => {
  const status = useStatus();
  const { themeClassName } = useTheme();

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Anonymous auth error:", errorCode, errorMessage);
      });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={cn(
        "bg-cat-background text-cat-muted overflow-hidden",
        themeClassName
      )}
    >
      <div className="container pt-20 h-screen">
        <div className="max-w-7xl flex flex-col md:px-40 min-h-screen text-2xl font-bold">
          <div className="flex items-center justify-between">
            <Logo />
            <PreferencesModal />
          </div>
          <div className="pt-20">
            {status === "done" ? <Statistics /> : <TypingArea />}
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
