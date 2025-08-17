'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

import {
  useAppStore,
  selectPage,
  selectSearch,
  selectTotalPages,
} from '@/app/store/appStore';
import { AppButton } from '@/shared/ui';

import { DEFAULT_PAGE } from '@/server/constants';

export const Pagination = () => {
  const t = useTranslations('Pagination');
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const page = useAppStore(selectPage);
  const search = useAppStore(selectSearch);
  const totalPages = useAppStore(selectTotalPages);
  const setPage = useAppStore((s) => s.setPage);

  const isPrev = page <= Number(DEFAULT_PAGE);
  const isNext = totalPages ? page >= totalPages : false;

  const goTo = (newPage: number) => {
    if (newPage < 1) return;

    params.set('page', String(newPage));

    if (search.trim()) {
      params.set('q', search.trim());
    }

    setPage(newPage);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams) return;

    const raw = searchParams.get('page');

    const valid =
      raw && /^\d+$/.test(raw)
        ? Math.max(1, parseInt(raw, 10))
        : Number(DEFAULT_PAGE);

    if (String(valid) !== (raw ?? '')) {
      const p = new URLSearchParams(searchParams.toString());
      p.set('page', String(valid));
      router.replace(`?${p.toString()}`, { scroll: false });
    }

    setPage(valid);
  }, [searchParams, setPage, router]);

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <AppButton
        text={t('Previous')}
        onClick={() => goTo(page - 1)}
        disabled={isPrev}
      />

      <span className="px-2 font-medium text-slate-700 dark:text-gray-100">
        {t('Page')} {page}
        {totalPages ? ` ${t('Of')} ${totalPages}` : ''}
      </span>

      <AppButton
        text={t('Next')}
        onClick={() => goTo(page + 1)}
        disabled={isNext}
      />
    </div>
  );
};
