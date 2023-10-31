import { ThemeName } from "@/types/preferences-types";

export const themes = {
  teal: {
    themeClassName: "theme-teal",
    primaryColor: "171, 77%, 64%",
  },
  blue: {
    themeClassName: "theme-blue",
    primaryColor: "221.2, 100%, 70%",
  },
  violet: {
    themeClassName: "theme-violet",
    primaryColor: "255, 92%, 76%",
  },
  emerald: {
    themeClassName: "theme-emerald",
    primaryColor: "148.9, 100%, 74.3%",
  },
  indigo: {
    themeClassName: "theme-indigo",
    primaryColor: "239, 100%, 76%",
  },
};

export const getThemeClassNameAndPrimaryColor = (name: ThemeName) => {
  return themes[name];
};

export const getThemePrimaryColor = (name: ThemeName) => {
  return themes[name].primaryColor;
};
