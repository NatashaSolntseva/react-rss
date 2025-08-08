import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-slate-800 px-6 py-4 text-white dark:bg-gray-950 dark:text-gray-100">
      <div
        className="mb-2 flex items-center justify-between sm:hidden"
        data-testid="header-mobile-top"
      >
        <Link
          to="/"
          className="text-lg font-bold text-white dark:text-gray-100"
          data-testid="mobile-title"
        >
          Image Explorer
        </Link>
        <ThemeToggle />
      </div>

      <nav
        className="flex justify-center gap-4 text-sm sm:hidden"
        data-testid="header-mobile-nav"
      >
        <NavLink
          to="/"
          data-testid="mobile-home-link"
          className={({ isActive }) =>
            isActive ? 'text-blue-400 underline' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          data-testid="mobile-about-link"
          className={({ isActive }) =>
            isActive ? 'text-blue-400 underline' : 'hover:underline'
          }
        >
          About
        </NavLink>
      </nav>

      <div
        className="hidden items-center justify-between sm:flex"
        data-testid="header-desktop"
      >
        <Link
          to="/"
          className="text-xl font-bold text-white dark:text-gray-100"
          data-testid="desktop-title"
        >
          Image Explorer
        </Link>

        <nav className="flex items-center gap-6 text-xl">
          <NavLink
            to="/"
            data-testid="desktop-home-link"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 underline' : 'hover:underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            data-testid="desktop-about-link"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 underline' : 'hover:underline'
            }
          >
            About
          </NavLink>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
