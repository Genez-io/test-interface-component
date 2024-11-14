// theme.ts
export interface ButtonVariant {
  background: string;
  color: string; // Text color
}

export interface Theme {
  name: "light" | "dark";
  background: string;
  color: string;
  colors: {
    inactive: string;
    purple200: string;
    purple300: string;
    purple500: string;
    purple700: string;
    purple800: string;
    darkPurple300: string;
    darkPurple500: string;
    darkPurple700: string;
    grey200: string;
    grey300: string;
    grey400: string;
    grey500: string;
    grey600: string;
    grey700: string;
    grey800: string;
    black300: string;
    white: string;
    green: string;
    red: string;
    redDeleteBtn: string;
    yellow: string;
    transparent: string;
    vscodeBackground: string;
  };
}

// Define your themes
export const lightTheme: Theme = {
  name: "light",
  background: "#FFFFFF", //
  color: "#000000", //
  colors: {
    inactive: "#FAFAFA",
    purple200: "#F8F1FF", //
    purple300: "#F8F1FF", //
    purple500: "#EBD9FD", //
    purple700: "#DEBEFE",
    purple800: "#C995FC",
    darkPurple300: "#7730BA",
    darkPurple500: "#6D2BAB",
    darkPurple700: "#6D2BAB",
    grey200: "#FAFAFA", //
    grey300: "#2D2E2E", //
    grey400: "#CAC4D0", //
    grey500: "#EDEDED", //
    grey600: "#8F8F8E", //
    grey700: "#EAEAEB", //
    grey800: "#2D2E2E", //
    black300: "#fff", //
    white: "#1A1A19",
    green: "#34C759", //
    red: "#D40000", //
    redDeleteBtn: "#FF202040",
    yellow: "#FFC107",
    transparent: "transparent",
    vscodeBackground: "#EAEAEA",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  background: "#111111", //
  color: "#FAFAFA", //
  colors: {
    inactive: "#2D2E2E",
    purple200: "#994CE0", //
    purple300: "#693798", //
    purple500: "#523190", //
    purple700: "#2C1950",
    purple800: "#231340",
    darkPurple300: "#7730BA",
    darkPurple500: "#6D2BAB",
    darkPurple700: "#542185", //
    grey200: "#1F1F1F", //
    grey300: "#FAFAFA", //
    grey400: "#2D2E2E", //
    grey500: "#1F1F1F", //
    grey600: "#666666", //
    grey700: "#2D2E2E", //
    grey800: "#8F8F8E", //
    black300: "#1A1A19", //
    white: "#FFFFFF", //
    green: "#34C759", //
    red: "#D40000",
    redDeleteBtn: "#FF202040",
    yellow: "#FFBD5A",
    transparent: "transparent",
    vscodeBackground: "#2D3138",
  },
};
