/**
 * HeroThemeContext
 * Pages declare their hero background so the Header
 * knows whether to render white or dark text when transparent.
 *
 * Usage in any page:
 *   useHeroTheme("dark")   — hero is dark  → header text is white
 *   useHeroTheme("light")  — hero is light → header text is black
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

const HeroThemeContext = createContext<{
  heroDark: boolean;
  setHeroDark: (v: boolean) => void;
}>({ heroDark: true, setHeroDark: () => {} });

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [heroDark, setHeroDark] = useState(true);
  return (
    <HeroThemeContext.Provider value={{ heroDark, setHeroDark }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme(theme: Theme) {
  const { setHeroDark } = useContext(HeroThemeContext);
  useEffect(() => {
    setHeroDark(theme === "dark");
    // Reset to dark when page unmounts (safe default)
    return () => setHeroDark(true);
  }, [theme, setHeroDark]);
}

export function useHeroThemeValue() {
  return useContext(HeroThemeContext).heroDark;
}
