'use client';

import { useEffect, useState, ReactNode } from 'react';
import { type Theme, ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    try {
      const stored =
        typeof window !== 'undefined'
          ? (localStorage.getItem('theme') as Theme | null)
          : null;

      const prefersDark =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const initial: Theme = stored ?? (prefersDark ? 'dark' : 'light');
      setTheme(initial);
    } catch (err) {
      console.warn(
        'ThemeProvider: failed to read initial theme from localStorage',
        err
      );
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.toggle('dark', theme === 'dark');

    try {
      localStorage.setItem('theme', theme);
    } catch (err) {
      console.warn(
        'ThemeProvider: failed to persist theme to localStorage',
        err
      );
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
