import { cn } from "@/lib/utils";

import { useStatus } from "@/stores/typing-store";
import { useTheme } from "@/stores/preferences-store";

import { Logo } from "@/components/logo";
import { TypingArea } from "@/components/typing-area";
import { Statistics } from "@/components/statistics";

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
        </div>
        <div className="pt-20">
          {status === "done" ? <Statistics /> : <TypingArea />}
        </div>
      </div>
    </div>
  );
};

export default App;
