'use client';

import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';
import { useSelectionStore } from '@/app/store/selectionStore';
import { CardItem } from '@/server/types';
import { useTranslations } from 'next-intl';

interface Props {
  items: CardItem[];
  page: number;
}

export const CardList = ({ items, page }: Props) => {
  const t = useTranslations('CardList');
  const router = useRouter();
  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const toggleSelected = useSelectionStore((state) => state.toggleSelected);

  const isSelected = (id: string) => selectedIds.includes(id);

  const handleCardClick = (id: string) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
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
