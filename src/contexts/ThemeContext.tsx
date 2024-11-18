import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, Theme } from "../theme/theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode; isDarkMode: boolean }> = ({
  children,
  isDarkMode,
}) => {
  return <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};
