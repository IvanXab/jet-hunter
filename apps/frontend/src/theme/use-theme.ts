import { useSyncExternalStore } from "react";
import {
  getSystemTheme,
  getThemePreference,
  setThemePreference,
  subscribeToSystemTheme,
  subscribeToThemePreference,
  type Theme,
} from "@/theme/theme-store";

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): ThemeState {
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreference,
  );
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
  );
  const theme = preference === "system" ? systemTheme : preference;

  const setTheme = (nextTheme: Theme) => {
    setThemePreference(nextTheme === systemTheme ? "system" : nextTheme);
  };

  return { theme, setTheme };
}
