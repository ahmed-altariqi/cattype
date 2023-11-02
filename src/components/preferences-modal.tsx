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

export const PreferencesModal = () => {
  const { reset } = useTypingActions();
  const {
    changeTheme,
    changeWordCount,
    changeWordPopularity,
    changeTextPosition,
  } = usePreferenceActions();
  const { toast } = useToast();

  const handleThemeClick = (theme: ThemeName) => {
    toast({
      title: "Theme",
      description: `Successfully set theme to ${theme}`,
      duration: 2500,
    });
    changeTheme(theme);
    reset();
  };

  const handleWordCountClick = (wordCount: WordCount) => {
    toast({
      title: "Word Count",
      description: `Successfully set word count to ${wordCount}`,
      duration: 2500,
    });
    changeWordCount(wordCount);
    reset();
  };

  const handleWordPopularityClick = (
    wordPopularity: WordsPopularity
  ) => {
    toast({
      title: "Words Popularity",
      description: `Successfully set words popularity to ${wordPopularity}`,
      duration: 2500,
    });
    changeWordPopularity(wordPopularity);
    reset();
  };

  const handleTextPositionClick = (textPosition: TextPosition) => {
    toast({
      title: "Text Position",
      description: `Successfully set words popularity to ${textPosition}`,
      duration: 2500,
    });
    changeTextPosition(textPosition);
    reset();
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
          <div className="space-y-4">
            <h4>Themes</h4>
            <div className="flex flex-wrap gap-1">
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("violet")}
              >
                violet
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "violet"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("teal")}
              >
                teal
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "teal"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("blue")}
              >
                blue
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "blue"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("emerald")}
              >
                emerald
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "emerald"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("indigo")}
              >
                indigo
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "indigo"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("burlywood")}
              >
                burlywood
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "burlywood"
                    )})`,
                  }}
                ></span>
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleThemeClick("cyan")}
              >
                cyan
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${getThemePrimaryColor(
                      "cyan"
                    )})`,
                  }}
                ></span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4>Word count</h4>
            <div className="flex flex-wrap gap-1">
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordCountClick(10)}
              >
                10
              </Button>

              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordCountClick(15)}
              >
                15
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordCountClick(30)}
              >
                30
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordCountClick(60)}
              >
                60
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4>Word Popularity</h4>
            <div className="flex flex-wrap gap-1">
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordPopularityClick(200)}
              >
                200 words
              </Button>

              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordPopularityClick(1000)}
              >
                1K words
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordPopularityClick(5000)}
              >
                5K words
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordPopularityClick(10000)}
              >
                10K words
              </Button>
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleWordPopularityClick(20000)}
              >
                20K words
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4>Text Position</h4>
            <div className="flex flex-wrap gap-1">
              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleTextPositionClick("left")}
              >
                left
              </Button>

              <Button
                className="flex items-center gap-2"
                variant="cat"
                onClick={() => handleTextPositionClick("center")}
              >
                center
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
