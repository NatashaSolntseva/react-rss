'use client';

import Image from 'next/image';
import { useSelectionStore } from '@/app/store/selectionStore';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { selectPage, selectSearch, useAppStore } from '@/app/store/appStore';
import { useLatestImage } from '@/hooks/useLatestImages';
import { useSearchImages } from '@/hooks/useSearchImages';

import { IMAGES_PER_PAGE } from '@/server/constants';

export const CardList = () => {
  const t = useTranslations('CardList');
  const router = useRouter();

  const page = useAppStore(selectPage);
  const searchTerm = useAppStore(selectSearch);
  const isSearch = !!searchTerm;

  const { data: latestData } = useLatestImage(page, IMAGES_PER_PAGE, !isSearch);
  const { data: searchData } = useSearchImages(searchTerm, page);
  const images = isSearch ? (searchData?.results ?? []) : (latestData ?? []);

  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const toggleSelected = useSelectionStore((state) => state.toggleSelected);
  const isSelected = (id: string) => selectedIds.includes(id);

  const handleCardClick = (id: string) => {
    router.push(`/?page=${page}&imageId=${id}`);
  };

  return (
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
  );
};
