import { useNavigate, useParams } from 'react-router-dom';
import { useSelectionStore } from '@/app/store/selectionStore';

import type { CardItem } from '@/api/types';
import { DEFAULT_PAGE } from '@/api/constants';

interface Props {
  items: CardItem[];
}

export const CardList = ({ items }: Props) => {
  const { page = DEFAULT_PAGE } = useParams();
  const navigate = useNavigate();

  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const toggleSelected = useSelectionStore((state) => state.toggleSelected);
  const isSelected = (id: string) => selectedIds.includes(id);

  const handleCardClick = (id: string) => {
    navigate(`/${page}/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="block cursor-pointer overflow-hidden rounded bg-white shadow transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:bg-gray-800"
        >
          <img
            onClick={() => handleCardClick(item.id)}
            src={item.imageUrl}
            alt={item.alt_description}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-gray-600 dark:text-gray-100">
              Photo by <strong>{item.author}</strong>
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
