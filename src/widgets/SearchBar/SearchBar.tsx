'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

import { AppButton } from '@/shared/ui/';
import { useAppStore, selectSearch } from '@/app/store/appStore';

export const SearchBar = () => {
  const t = useTranslations('SearchBar');

  const term = useAppStore(selectSearch);
  const setSearch = useAppStore((s) => s.setSearchTerm);
  const resetStore = useAppStore((s) => s.reset);

  const [inputValue, setInputValue] = useState(term);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('HS');
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearch(trimmed);
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setInputValue('');
    resetStore();
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
