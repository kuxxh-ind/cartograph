"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    // Read stored theme from localStorage or cookie
    const storedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setThemeState(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    applyTheme(newTheme);
  };

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "light") {
      root.setAttribute("data-theme", "light");
    } else if (t === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "system");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Script injected into <head> to set data-theme on <html> before first paint.
 */
export const ThemeScript = () => {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('theme') || 'system';
        document.documentElement.setAttribute('data-theme', t);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

