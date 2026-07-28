import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'kjm-theme';

// Two themes only, both dark-based — 'dark' (default, opaque) and 'liquid'
// (translucent liquid-glass skin). No system-preference auto-detection: the
// theme only ever changes when the user clicks the toggle, so it can never
// silently flip on load.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'liquid' ? 'dark' : 'liquid'));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isLiquid: theme === 'liquid' }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- standard context+hook pairing
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
