import { Settings } from "lucide-react";

import { ThemeName } from "@/data/themes";
import { WordsPopularity, WordCount } from "@/types/typing-types";
import { TextPosition } from "@/types/preferences-types";

import { getThemePrimaryColor } from "@/data/themes";

import { usePreferenceActions } from "@/stores/preferences-store";
import { useTypingActions } from "@/stores/typing-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Preferences =
  | ThemeName
  | WordCount
  | WordsPopularity
  | TextPosition;

type ButtonConfig = {
  text: string | number;
  value: Preferences;
};

type ModalConfig = {
  title: string;
  clickHandler: (value: Preferences) => void;
  toastDescription: string;
  buttons: ButtonConfig[];
};

type UpdatePreferencesAndResetTypingStore = {
  onClick: (value: Preferences) => void;
  value: Preferences;
  toastValue: {
    title: string;
    description: string;
  };
};

export const PreferencesModal = () => {
  const { reset } = useTypingActions();
  const {
    changeTheme,
    changeWordCount,
    changeWordPopularity,
    changeTextPosition,
  } = usePreferenceActions();
  const { toast } = useToast();

  const modalConfig: Record<string, ModalConfig> = {
    themes: {
      title: "Themes",
      clickHandler: changeTheme as (value: Preferences) => void,
      toastDescription: "Successfully set themes to ",
      buttons: [
        {
          text: "violet",
          value: "violet",
        },
        {
          text: "emerald",
          value: "emerald",
        },
        {
          text: "blue",
          value: "blue",
        },
        {
          text: "cyan",
          value: "cyan",
        },
        {
          text: "burlywood",
          value: "burlywood",
        },
        {
          text: "indigo",
          value: "indigo",
        },
      ],
    },
    wordCount: {
      title: "Word Count",
      clickHandler: changeWordCount as (value: Preferences) => void,
      toastDescription: "Successfully set word count to ",
      buttons: [
        {
          text: 10,
          value: 10,
        },
        {
          text: 15,
          value: 15,
        },
        {
          text: 30,
          value: 30,
        },
        {
          text: 60,
          value: 60,
        },
      ],
    },
    wordPopularity: {
      title: "Words Popularity",
      clickHandler: changeWordPopularity as (
        value: Preferences
      ) => void,
      toastDescription: "Successfully set words popularity to ",
      buttons: [
        {
          text: 200,
          value: 200,
        },
        {
          text: "1K",
          value: 1_000,
        },
        {
          text: "5K",
          value: 5_000,
        },
        {
          text: "10K",
          value: 10_000,
        },
        {
          text: "20K",
          value: 20_000,
        },
      ],
    },
    textPosition: {
      title: "Text Position",
      clickHandler: changeTextPosition as (
        value: Preferences
      ) => void,
      toastDescription: "Successfully set text to ",
      buttons: [
        { text: "left", value: "left" },
        { text: "center", value: "center" },
      ],
    },
  };

  const updatePreferenceAndResetTypingStore = ({
    onClick,
    value,
    toastValue,
  }: UpdatePreferencesAndResetTypingStore) => {
    toast({ duration: 2500, ...toastValue });
    onClick(value);
    reset();
  };

  const renderButtons = (config: ModalConfig) => {
    const { title, clickHandler, toastDescription, buttons } = config;
    return (
      <div className="space-y-4">
        <h4>{title}</h4>
        <div className="flex flex-wrap gap-1">
          {buttons.map(({ text, value }) => (
            <Button
              key={String(value)}
              className="flex items-center gap-2"
              variant="cat"
              onClick={() =>
                updatePreferenceAndResetTypingStore({
                  value,
                  onClick: clickHandler,
                  toastValue: {
                    title,
                    description: `${toastDescription} ${value}`,
                  },
                })
              }
            >
              {text}
              {title === "Themes" && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      value as ThemeName
                    )})`,
                  }}
                ></span>
              )}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Select theme, word count and word popularity.
          </DialogDescription>
        </DialogHeader>
        <div className="pb-10 flex flex-col gap-6 ">
          {renderButtons(modalConfig.themes)}
          {renderButtons(modalConfig.wordCount)}
          {renderButtons(modalConfig.wordPopularity)}
          {renderButtons(modalConfig.textPosition)}
        </div>
      </DialogContent>
    </Dialog>
  );
};
