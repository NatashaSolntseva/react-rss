'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-semibold text-slate-700 dark:text-gray-100">
        {t('Title')}
      </h2>
      <p className="mb-6 text-slate-500 dark:text-gray-300">
        {t('Description')}
      </p>
      <AppButton text={t('Reload')} onClick={reset} />
    </div>
  );
}
