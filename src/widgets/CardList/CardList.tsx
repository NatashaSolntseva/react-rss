'use client';

import Image from 'next/image';
import { useSelectionStore } from '@/app/store/selectionStore';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { selectPage, selectSearch, useAppStore } from '@/app/store/appStore';
import { useLatestImage } from '@/hooks/useLatestImages';
import { useSearchImages } from '@/hooks/useSearchImages';

import { CardItem } from '@/server/types';

import { IMAGES_PER_PAGE } from '@/server/constants';
import { AppButton } from '@/shared/ui';

export const CardList = ({
  initialCardData,
}: {
  initialCardData?: CardItem[];
}) => {
  const t = useTranslations('CardList');
  const router = useRouter();

  const page = useAppStore(selectPage);

  const searchTerm = useAppStore(selectSearch);
  const isSearch = !!searchTerm;

  const { data: latestData, refetch: refetchLatest } = useLatestImage(
    page,
    IMAGES_PER_PAGE,
    !isSearch,
    initialCardData
  );
  const { data: searchData, refetch: refetchSearch } = useSearchImages(
    searchTerm,
    page
  );
  const images = isSearch ? (searchData?.results ?? []) : (latestData ?? []);

  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const toggleSelected = useSelectionStore((state) => state.toggleSelected);
  const isSelected = (id: string) => selectedIds.includes(id);

  const handleCardClick = (id: string) => {
    router.push(`/?page=${page}&imageId=${id}`);
  };

  const handleRefresh = () => {
    if (isSearch) {
      refetchSearch();
    } else {
      refetchLatest();
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-center">
        <AppButton text={t('Refetch')} onClick={handleRefresh} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((item) => (
          <div
            key={item.id}
            className="block cursor-pointer overflow-hidden rounded bg-white shadow transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:bg-gray-800"
          >
            <div
              className="relative max-h-[240px] w-full overflow-hidden rounded"
              style={{ aspectRatio: '3 / 2' }}
              onClick={() => handleCardClick(item.id)}
            >
              <Image
                src={item.imageUrl}
                alt={item.alt_description || 'Image'}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                {t('PhotoBy')} <strong>{item.author}</strong>
              </p>
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelected(item);
                }}
                className="h-4 w-4 cursor-pointer accent-gray-800 dark:accent-gray-100"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
