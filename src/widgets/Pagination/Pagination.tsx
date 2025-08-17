'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

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

  const page = useAppStore(selectPage);
  const search = useAppStore(selectSearch);
  const totalPages = useAppStore(selectTotalPages);
  const setPage = useAppStore((s) => s.setPage);

  const isPrev = page <= Number(DEFAULT_PAGE);
  const isNext = totalPages ? page >= totalPages : false;

  const buildHref = (page: number) => {
    const q = search.trim();
    return q ? `?page=${page}?q=${encodeURIComponent(q)}` : `?page=${page}`;
  };

  const goTo = (p: number) => {
    if (p < 1) return;
    setPage(p);
    router.push(buildHref(p));
  };

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
      {/* <AppButton text="Refresh" onClick={handleRefresh} /> */}
    </div>
  );
};
