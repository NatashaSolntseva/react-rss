'use client';

import { useTheme } from '@/hooks/useTheme';
import { useTranslations } from 'next-intl';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const t = useTranslations('ThemeToggle');

  return (
    <div
      data-testid="theme-toggle"
      onClick={toggleTheme}
      className={`relative flex h-6 w-18 cursor-pointer items-center rounded-full px-1 transition-colors duration-300 ${
        isDark ? 'justify-start bg-slate-800' : 'justify-end bg-gray-300'
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full transition-all duration-300 ${
          isDark ? 'bg-slate-100' : 'bg-slate-800'
        }`}
      ></div>

      <span
        className={`absolute text-[10px] font-medium transition-all duration-300 sm:text-[8px] ${
          isDark
            ? 'left-8 text-slate-100 opacity-100'
            : 'left-2 text-slate-800 opacity-100'
        }`}
      >
        {isDark ? t('Night') : t('Day')}
      </span>
    </div>
  );
};
