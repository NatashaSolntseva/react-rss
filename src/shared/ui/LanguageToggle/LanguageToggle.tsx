'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isRu = locale === 'ru';
  const nextLocale = isRu ? 'en' : 'ru';

  const handleToggle = () => {
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <div
      data-testid="lang-toggle"
      onClick={handleToggle}
      className={`relative flex h-6 w-14 cursor-pointer items-center rounded-full bg-gray-300 px-1 transition-colors duration-300 dark:bg-slate-800 ${
        isRu ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className="h-5 w-5 rounded-full bg-slate-800 transition-all duration-300 dark:bg-slate-100" />
      <span
        className={`absolute text-[10px] font-medium text-slate-800 transition-all duration-300 sm:text-[8px] dark:text-slate-100 ${
          isRu ? 'left-8 opacity-100' : 'left-2 opacity-100'
        }`}
      >
        {isRu ? 'RU' : 'EN'}
      </span>
    </div>
  );
};
