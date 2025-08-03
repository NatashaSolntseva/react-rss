import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-18 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
        isDark ? 'bg-slate-800 justify-start' : 'bg-gray-300 justify-end'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 ${
          isDark ? 'bg-slate-100' : 'bg-slate-800'
        }`}
      ></div>

      <span
        className={`absolute text-[10px] font-medium transition-all duration-300 sm:text-[8px] ${
          isDark
            ? 'text-slate-100 left-8 opacity-100'
            : 'text-slate-800 left-2 opacity-100'
        }`}
      >
        {isDark ? 'NIGHT' : 'DAY'}
      </span>
    </div>
  );
};
