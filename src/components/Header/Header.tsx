import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-slate-800 dark:bg-gray-950 text-white dark:text-gray-100 px-6 py-4">
      <div
        className="flex justify-between items-center sm:hidden mb-2"
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
            isActive ? 'underline text-blue-400' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          data-testid="mobile-about-link"
          className={({ isActive }) =>
            isActive ? 'underline text-blue-400' : 'hover:underline'
          }
        >
          About
        </NavLink>
      </nav>

      <div
        className="hidden sm:flex items-center justify-between"
        data-testid="header-desktop"
      >
        <Link
          to="/"
          className="text-xl font-bold text-white dark:text-gray-100"
          data-testid="desktop-title"
        >
          Image Explorer
        </Link>

        <nav className="flex gap-6 text-xl items-center">
          <NavLink
            to="/"
            data-testid="desktop-home-link"
            className={({ isActive }) =>
              isActive ? 'underline text-blue-400' : 'hover:underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            data-testid="desktop-about-link"
            className={({ isActive }) =>
              isActive ? 'underline text-blue-400' : 'hover:underline'
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
