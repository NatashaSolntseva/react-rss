'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

import { useAppStore, selectSearch } from '@/app/store/appStore';

import { AppButton } from '@/shared/ui/';

export const SearchBar = () => {
  const t = useTranslations('SearchBar');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const term = useAppStore(selectSearch);

  const setSearch = useAppStore((s) => s.setSearchTerm);
  const setPage = useAppStore((s) => s.setPage);
  const resetStore = useAppStore((s) => s.reset);

  const [inputValue, setInputValue] = useState(term);

  useEffect(() => {
    setInputValue(term);
  }, [term]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (trimmed) {
      params.set('q', trimmed);
      params.get('imageId');
      setSearch(trimmed);
      setPage(1);
    } else {
      params.delete('q');
      params.delete('imageId');
      setPage(1);
      setSearch('');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setInputValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.set('page', '1');
    resetStore();
    setPage(1);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <input
        className="w-64 rounded border bg-white px-4 py-2 text-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder={t('Placeholder')}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-2 flex gap-2 sm:mt-0">
        <AppButton text={t('Search')} onClick={handleSearch} />
        <AppButton text={t('Reset')} onClick={handleReset} />
      </div>
    </div>
  );
};
