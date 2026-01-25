import { browser } from "$app/environment";

type Theme = "light" | "dark" | "system";

class ThemeStore {
  theme = $state<Theme>("system");
  current = $state<"light" | "dark">("dark"); // Resolved theme

  constructor() {
    if (browser) {
      // Load from local storage
      const stored = localStorage.getItem("theme") as Theme;
      if (stored) this.theme = stored;

      // Initial resolution
      this.resolve();

      // Listen for system changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", () => this.resolve());
    }
  }

  resolve() {
    if (!browser) return;

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (this.theme === "system") {
      this.current = systemDark ? "dark" : "light";
    } else {
      this.current = this.theme;
    }

    this.apply();
  }

  apply() {
    if (!browser) return;

    const root = document.documentElement;
    if (this.current === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }

  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    this.resolve();
  }

  toggle() {
    const next: Theme = this.current === "dark" ? "light" : "dark";
    this.setTheme(next);
  }
}

export const theme = new ThemeStore();
