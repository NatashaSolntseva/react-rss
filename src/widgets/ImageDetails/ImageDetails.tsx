'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

import { HeaderWithCloseBtn } from '@/shared/ui';
import { useImageDetails } from './model/useImageDetails';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { useTranslations } from 'next-intl';

interface ImageDetailsProps {
  id: string;
}

export const ImageDetails = ({ id }: ImageDetailsProps) => {
  const t = useTranslations('ImageDetails');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: details, isFetching, error, refetch } = useImageDetails(id);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('imageId');
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (!id) return null;

  return (
    <aside className="overflow-hidden rounded bg-white p-4 shadow dark:bg-gray-800">
      {!isFetching && error && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />
          <p className="font-medium text-red-600">{error.message}</p>
        </div>
      )}

      {!isFetching && details && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />

          <Link
            href={details.urls.full}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 block"
          >
            <img
              src={details.urls.small}
              alt={details.alt_description || ''}
              className="rounded transition hover:opacity-80"
            />
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

          <AppButton
            text="Refresh"
            onClick={() => refetch()}
            className="mt-3"
          />
        </div>
      )}
    </aside>
  );
};
