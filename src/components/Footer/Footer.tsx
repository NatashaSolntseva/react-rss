import { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-rsschool3.png';

const Footer: FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-4 px-6 text-sm flex items-center justify-between flex-wrap gap-2">
      <Link
        to={'https://github.com/NatashaSolntseva'}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        GitHub
      </Link>

      <div className="text-center flex-1">© 2025 Image Search App</div>

      <Link
        to={'https://app.rs.school/'}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto"
      >
        <img src={logo} alt="RS School" className="h-6 dark:invert" />
      </Link>
    </footer>
  );
};

export default Footer;
