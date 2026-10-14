"use client";

import React from "react";
import { useTheme, Theme } from "./theme-provider";
import { Monitor, Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: "system",
      label: "System",
      icon: <Monitor className="w-3.5 h-3.5" />,
    },
    {
      value: "light",
      label: "Light",
      icon: <Sun className="w-3.5 h-3.5" />,
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div
      className="inline-flex items-center p-1 rounded-full border border-border bg-muted/50 gap-1 text-xs"
      role="radiogroup"
      aria-label="Theme selection"
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all font-medium ${
              isActive
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
            aria-checked={isActive}
            role="radio"
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

