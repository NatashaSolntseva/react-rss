import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { fetchPhotoDetails } from '@/server/unsplash';
import DetailsHeader from './DetailsHeader';

type Params = { page: string; id: string };

export default async function DetailsSlot({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page: pageStr, id } = await params;
  const page = Number(pageStr ?? '1');

  const details = await fetchPhotoDetails(id);

  const t = await getTranslations('DetailsSlot');
  const th = await getTranslations('DetailsHeader');
  const title = th('Title');

  return (
    <aside className="mt-16 overflow-hidden rounded bg-white p-4 shadow dark:bg-gray-800">
      <DetailsHeader page={page} title={title} />

      <Link
        href={details.urls.full}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 block"
      >
        <div
          className="relative w-full overflow-hidden rounded"
          style={{ aspectRatio: '3 / 2' }}
        >
          <Image
            src={details.urls.small}
            alt={details.alt_description || ''}
            fill
            className="object-cover transition hover:opacity-80"
          />
        </div>
      </Link>

      <p className="mb-1 text-sm text-slate-600 dark:text-gray-100">
        <strong>{t('Author')}:</strong>{' '}
        <Link
          href={details.user.links.html}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {details.user.name}
        </Link>
      </p>

      <p className="mb-1 text-sm text-slate-600 dark:text-gray-100">
        <strong>{t('Likes')}:</strong> {details.likes}
      </p>

      {details.description && (
        <p className="text-sm text-slate-600 dark:text-gray-100">
          <strong>{t('Description')}:</strong> {details.description}
        </p>
      )}
    </aside>
  );
}
