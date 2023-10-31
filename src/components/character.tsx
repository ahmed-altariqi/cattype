import { CharAndStatus } from "@/types/typing-types";

import {
  useActiveCharacterIndex,
  useActiveWordIndex,
  useWordListCharAndStatus,
} from "@/stores/typing-store";

import { cn } from "@/lib/utils";

type CharacterProps = {
  charAndStatus: CharAndStatus;
  charIndex: number;
  wordIndex: number;
};

export const Character = ({
  charAndStatus,
  charIndex,
  wordIndex,
}: CharacterProps) => {
  const activeWordIndex = useActiveWordIndex();
  const activeCharacterIndex = useActiveCharacterIndex();
  const wordListCharAndStatus = useWordListCharAndStatus();

  const { char } = charAndStatus;

  const currentWord = wordListCharAndStatus[wordIndex];

  const isActiveWord = wordIndex === activeWordIndex;
  const isActiveCharacter = charIndex === activeCharacterIndex;

  const isCorrectCharacter =
    currentWord[charIndex]?.charStatus === "CORRECT";
  const isIncorrectCharacter =
    currentWord[charIndex]?.charStatus === "INCORRECT";

  const isActive = isActiveWord && isActiveCharacter;

  return (
    <span
      className={cn(
        isActive && "text-cat-neutral",
        isCorrectCharacter && "text-cat-primary",
        isIncorrectCharacter && "text-cat-error"
      )}
    >
      <span>{char}</span>
    </span>
  );
};
