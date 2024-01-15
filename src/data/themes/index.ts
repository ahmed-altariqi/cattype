export type ThemeName = keyof typeof themes;

export const themes = {
  teal: {
    themeClassName: "theme-teal",
    primaryColor: "171, 77%, 64%",
  },
  blue: {
    themeClassName: "theme-blue",
    primaryColor: "216.34, 94.67%, 85.29%",
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
  burlywood: {
    themeClassName: "theme-devjood",
    primaryColor: "34, 57%, 70%",
  },
  cyan: {
    themeClassName: "theme-cyan",
    primaryColor: "180, 100%, 61.8%",
  }
};

export const getThemeClassNameAndPrimaryColor = (name: ThemeName) => {
  return themes[name];
};

export const getThemePrimaryColor = (name: ThemeName) => {
  return themes[name].primaryColor;
};
