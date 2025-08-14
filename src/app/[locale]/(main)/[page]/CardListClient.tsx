'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import type { CardItem } from '@/server/types';
import { DEFAULT_PAGE, IMAGES_PER_PAGE } from '@/server/constants';

import { SearchBar, CardList, Flyout } from '@/widgets/';
import { AppButton } from '@/shared/ui';

export default function CardListClient({
  initialItems,
  page,
  totalImages,
  searchQuery,
}: {
  initialItems: CardItem[];
  page: number;
  totalImages: number | null;
  searchQuery: string;
}) {
  const t = useTranslations('Pagination');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    setSearchTerm(trimmed);
    router.push(`/${DEFAULT_PAGE}?q=${encodeURIComponent(trimmed)}`);
  };

  const totalPages = totalImages
    ? Math.ceil(totalImages / IMAGES_PER_PAGE)
    : null;

  const goToPage = (newPage: number) => {
    if (searchTerm) {
      router.push(`/${newPage}?q=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push(`/${newPage}`);
    }
  };

  return (
    <div className="flex-grow">
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      <div className="h-full w-full">
        <CardList items={initialItems} page={page} />
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <AppButton
          text={t('Previous')}
          onClick={() => goToPage(page - 1)}
          disabled={page <= Number(DEFAULT_PAGE)}
        />
        <span className="px-2 font-medium text-slate-700 dark:text-gray-100">
          {t('Page')} {page}
          {totalPages ? ` ${t('Of')} ${totalPages}` : ''}
        </span>
        <AppButton
          text={t('Next')}
          onClick={() => goToPage(page + 1)}
          disabled={totalPages ? page >= totalPages : false}
        />
        {/* <AppButton text="Refresh" onClick={handleRefresh} /> */}
      </div>
      <Flyout />
    </div>
  );
}
