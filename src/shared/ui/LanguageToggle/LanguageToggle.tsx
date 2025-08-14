'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

export const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isRu = locale === 'ru';
  const nextLocale = isRu ? 'en' : 'ru';

  const handleToggle = () => {
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { locale: nextLocale });
  };

  return (
    <div
      data-testid="lang-toggle"
      onClick={handleToggle}
      className={`relative flex h-6 w-14 cursor-pointer items-center rounded-full px-1 transition-colors duration-300 ${
        isRu ? 'justify-start bg-slate-800' : 'justify-end bg-gray-300'
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full transition-all duration-300 ${
          isRu ? 'bg-slate-100' : 'bg-slate-800'
        }`}
      />
      <span
        className={`absolute text-[10px] font-medium transition-all duration-300 sm:text-[8px] ${
          isRu
            ? 'left-8 text-slate-100 opacity-100'
            : 'left-2 text-slate-800 opacity-100'
        }`}
      >
        {isRu ? 'RU' : 'EN'}
      </span>
    </div>
  );
};
