import { cn } from "@/lib/utils";

import { useStatus } from "@/stores/typing-store";
import { useTheme } from "@/stores/preferences-store";

import { Logo } from "@/components/logo";
import { TypingArea } from "@/components/typing-area";
import { Statistics } from "@/components/statistics";
import { PreferencesModal } from "@/components/preferences-modal";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const status = useStatus();
  const { themeClassName } = useTheme();

  return (
    <div
      className={cn(
        "bg-cat-background text-cat-muted",
        themeClassName
      )}
    >
      <div className="max-w-7xl pt-20 flex flex-col p-10 md:px-40 min-h-screen text-2xl font-bold">
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
  );
};

export default App;
