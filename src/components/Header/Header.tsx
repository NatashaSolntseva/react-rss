import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="bg-slate-800 text-white p-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">
        Image Search App
      </Link>

      <nav className="flex gap-4 text-sm">
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
    </header>
  );
};

export default Header;
