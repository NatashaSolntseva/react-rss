import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Footer, Header } from '@/widgets/';
import { ThemeProvider } from '../theme/ThemeProvider';

import '@/shared/styles/main.css';
import { QueryProvider } from '../ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Image Explore',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="layout bg-slate-100 dark:bg-gray-900">
        <NextIntlClientProvider>
          <ThemeProvider>
            <QueryProvider>
              <div id="root">
                <Header />
                <main className="min-h-[calc(100vh-60px-72px)] flex-grow px-6 py-4">
                  {children}
                </main>
                <Footer />
              </div>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
