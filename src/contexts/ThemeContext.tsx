import React, { createContext, useContext, useState, useEffect } from "react";
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

export const ThemeProviderWithToggle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === darkTheme ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
