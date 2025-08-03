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
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden block hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
        >
          <img
            onClick={() => handleCardClick(item.id)}
            src={item.imageUrl}
            alt={item.alt_description}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="p-4 flex items-center justify-between">
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
              className="w-4 h-4 accent-gray-800 dark:accent-gray-100 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
