'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageToggle, ThemeToggle } from '@/shared/ui';

export const Header = () => {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const getLinkClass = (href: string) =>
    pathname === href ? 'text-blue-400 underline' : 'hover:underline';

  return (
    <header className="bg-slate-800 px-6 py-4 text-white dark:bg-gray-950 dark:text-gray-100">
      <div
        className="mb-2 flex items-center justify-between sm:hidden"
        data-testid="header-mobile-top"
      >
        <Link
          href="/"
          className="text-lg font-bold text-white dark:text-gray-100"
          data-testid="mobile-title"
        >
          Image Explorer
        </Link>
        <div className="flex gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <nav
        className="flex justify-center gap-4 text-sm sm:hidden"
        data-testid="header-mobile-nav"
      >
        <Link
          href="/"
          data-testid="mobile-home-link"
          className={getLinkClass('/')}
        >
          {t('HomeLink')}
        </Link>
        <Link
          href="/about"
          data-testid="mobile-about-link"
          className={getLinkClass('/about')}
        >
          {t('AboutLink')}
        </Link>
      </nav>

      <div
        className="hidden items-center justify-between sm:flex"
        data-testid="header-desktop"
      >
        <Link
          href="/"
          className="text-xl font-bold text-white dark:text-gray-100"
          data-testid="desktop-title"
        >
          Image Explorer
        </Link>

        <nav className="flex items-center gap-6 text-xl">
          <Link
            href="/"
            data-testid="desktop-home-link"
            className={getLinkClass('/')}
          >
            {t('HomeLink')}
          </Link>
          <Link
            href="/about"
            data-testid="desktop-about-link"
            className={getLinkClass('/about')}
          >
            {t('AboutLink')}
          </Link>
        </nav>
        <div className="flex gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
