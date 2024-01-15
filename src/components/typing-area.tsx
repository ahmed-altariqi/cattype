import { useEffect } from "react";

import { cn, isAlphanumericOrSpaceKey } from "@/lib/utils";

import {
  useActiveWordIndex,
  useStatus,
  useTypingActions,
  useWordListCharAndStatus,
} from "@/stores/typing-store";
import { useTextPosition } from "@/stores/preferences-store";

import { Character } from "@/components/character";

export const TypingArea = () => {
  const textPosition = useTextPosition();
  const status = useStatus();
  const words = useWordListCharAndStatus();
  const activeWordIndex = useActiveWordIndex();

  const { startTest, keyStroke } = useTypingActions();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key;

      if (status === "idle" && isAlphanumericOrSpaceKey(key)) {
        startTest(key);
        return;
      }

      if (
        (status === "typing" && isAlphanumericOrSpaceKey(key)) ||
        key === "Backspace"
      ) {
        keyStroke(key);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [status, keyStroke, startTest]);

  return (
    <div
      className={cn(
        "pt-20 flex",
        textPosition === "center" && "justify-center",
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p>
            <span>{activeWordIndex + 1}</span>/<span>{words?.length}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-start content-start gap-2">
          {words?.map((word, wordIndex) => (
            <span key={wordIndex} className="flex">
              {word.map((charAndStatus, charIndex) => (
                <Character
                  key={charIndex}
                  charAndStatus={charAndStatus}
                  charIndex={charIndex}
                  wordIndex={wordIndex}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
