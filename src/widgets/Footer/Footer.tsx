import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo-rsschool3.png';

export const Footer = () => {
  return (
    <footer className="bg-slate-800 px-6 py-6 text-sm text-white dark:bg-gray-950 dark:text-gray-100">
      <div
        className="hidden items-center justify-between sm:flex"
        data-testid="footer-desktop"
      >
        <Link
          href="https://github.com/NatashaSolntseva"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          data-testid="github-desktop"
        >
          GitHub
        </Link>

        <div data-testid="copyright-desktop">© 2025 Image Explorer</div>

        <Link
          href="https://app.rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="rsschool-desktop"
        >
          <Image
            src={logo.src}
            alt="RS School"
            className="h-6 invert"
            width={66}
            height={24}
          />
        </Link>
      </div>

      <div
        className="flex flex-col items-center gap-2 sm:hidden"
        data-testid="footer-mobile"
      >
        <div className="flex w-full justify-between">
          <Link
            href="https://github.com/NatashaSolntseva"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            data-testid="github-mobile"
          >
            GitHub
          </Link>

          <Link
            href="https://app.rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="rsschool-mobile"
          >
            <Image
              src={logo.src}
              alt="RS School"
              width={66}
              height={24}
              className="h-6 invert"
            />
          </Link>
        </div>

        <div data-testid="copyright-mobile">© 2025 Image Explorer</div>
      </div>
    </footer>
  );
};
