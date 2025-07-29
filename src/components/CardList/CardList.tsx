import { FC } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelectionStore } from '@/app/store/selectionStore';

import { UnsplashImage } from '@/api/types';

interface Props {
  items: UnsplashImage[];
}

export const CardList: FC<Props> = ({ items }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const toggleSelected = useSelectionStore((state) => state.toggleSelected);
  const isSelected = useSelectionStore((state) => state.isSelected);
  const selectedIds = useSelectionStore((state) => state.selectedIds);

  console.log('selectedIds', selectedIds);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => {
        const newParams = new URLSearchParams();
        newParams.set('page', page);
        if (query) newParams.set('query', query);
        newParams.set('details', item.id);

        return (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden block hover:shadow-lg hover:scale-[1.01] transition-all duration-300 "
          >
            <Link to={`?${newParams.toString()}`}>
              <img
                src={item.imageUrl}
                alt={item.author}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="p-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                Photo by <strong>{item.author}</strong>
              </p>
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelected(item.id);
                }}
                className="w-4 h-4 accent-gray-800 dark:accent-gray-100 cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
