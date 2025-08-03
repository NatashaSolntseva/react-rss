import { Link } from 'react-router-dom';
import logo from '@/assets/logo-rsschool3.png';

export const Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-gray-950 text-white dark:text-gray-100 py-6 px-6 text-sm">
      <div
        className="hidden sm:flex items-center justify-between"
        data-testid="footer-desktop"
      >
        <Link
          to="https://github.com/NatashaSolntseva"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          data-testid="github-desktop"
        >
          GitHub
        </Link>

        <div data-testid="copyright-desktop">© 2025 Image Explorer</div>

        <Link
          to="https://app.rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="rsschool-desktop"
        >
          <img src={logo} alt="RS School" className="h-6 invert" />
        </Link>
      </div>

      <div
        className="flex flex-col items-center gap-2 sm:hidden"
        data-testid="footer-mobile"
      >
        <div className="flex justify-between w-full">
          <Link
            to="https://github.com/NatashaSolntseva"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            data-testid="github-mobile"
          >
            GitHub
          </Link>

          <Link
            to="https://app.rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="rsschool-mobile"
          >
            <img src={logo} alt="RS School" className="h-6 invert" />
          </Link>
        </div>

        <div data-testid="copyright-mobile">© 2025 Image Explorer</div>
      </div>
    </footer>
  );
};
