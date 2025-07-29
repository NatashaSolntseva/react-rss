import { Link, NavLink } from 'react-router-dom';

import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-slate-800 dark:bg-gray-950 text-white dark:text-gray-100 py-4 px-6 flex items-center justify-between  ">
      <Link to="/" className="text-xl font-bold text-white dark:text-gray-100">
        Image Search App
      </Link>

      <nav className="flex gap-4 text-xl items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'underline text-blue-400' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'underline text-blue-400' : 'hover:underline'
          }
        >
          About
        </NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
};
