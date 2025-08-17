'use client';

import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export default function NotFound() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('NotFound');

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2
        data-testid="not-found-title"
        className="mb-4 text-4xl font-bold text-slate-800 dark:text-gray-100"
      >
        {t('Title')}
      </h2>
      <p className="mb-6 text-slate-600 dark:text-gray-300">
        {t('Description')}
      </p>
      <AppButton
        text={t('Back')}
        onClick={() => router.push('/', { locale })}
      />
    </div>
  );
}
