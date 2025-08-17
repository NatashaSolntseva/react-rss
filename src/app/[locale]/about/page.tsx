'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-800 dark:text-gray-200">
        {t('Title')}
      </h1>

      <p className="mb-4 text-slate-700 dark:text-gray-200">
        {t.rich('Paragraph1', {
          unsplashLink: (chunks) => (
            <Link
              href="https://unsplash.com/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <p className="mb-4 text-slate-700 dark:text-gray-200">
        {t.rich('Paragraph2', {
          rsSchoolLink: (chunks) => (
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-blue-500"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <p className="mb-6 text-slate-600 italic dark:text-gray-200">
        {t.rich('Footer', {
          authorLink: (chunks) => (
            <Link
              href="https://github.com/NatashaSolntseva"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
