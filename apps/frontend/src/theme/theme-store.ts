export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

const STORAGE_KEY = "jet-hunter:theme";
const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const listeners = new Set<() => void>();
let currentPreference: ThemePreference = "system";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function parsePreference(value: unknown): ThemePreference {
  return isTheme(value) ? value : "system";
}

function isStorageUnavailable(error: unknown): boolean {
  return error instanceof DOMException;
}

function readStoredPreference(): ThemePreference {
  try {
    return parsePreference(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    if (isStorageUnavailable(error)) {
      return "system";
    }
    throw error;
  }
}

function storePreference(preference: ThemePreference): void {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch (error) {
    if (!isStorageUnavailable(error)) {
      throw error;
    }
  }
}

function applyPreference(preference: ThemePreference): void {
  const root = document.documentElement;

  if (preference === "system") {
    delete root.dataset.theme;
    return;
  }
  root.dataset.theme = preference;
}

function updatePreference(preference: ThemePreference): void {
  currentPreference = preference;
  applyPreference(preference);
  listeners.forEach((listener) => {
    listener();
  });
}

function handleStorage(event: StorageEvent): void {
  if (event.key === STORAGE_KEY) {
    updatePreference(parsePreference(event.newValue));
  }
}

export function initializeTheme(): void {
  updatePreference(readStoredPreference());
  window.addEventListener("storage", handleStorage);
}

export function setThemePreference(preference: ThemePreference): void {
  storePreference(preference);
  updatePreference(preference);
}

export function getThemePreference(): ThemePreference {
  return currentPreference;
}

export function subscribeToThemePreference(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getSystemTheme(): Theme {
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
}

export function subscribeToSystemTheme(listener: () => void): () => void {
  const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);

  mediaQuery.addEventListener("change", listener);

  return () => {
    mediaQuery.removeEventListener("change", listener);
  };
}
