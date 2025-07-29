import { FC } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { UnsplashImage } from '@/api/types';

interface Props {
  items: UnsplashImage[];
}

const CardList: FC<Props> = ({ items }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => {
        const newParams = new URLSearchParams();
        newParams.set('page', page);
        if (query) newParams.set('query', query);
        newParams.set('details', item.id);

        return (
          <Link
            key={item.id}
            to={`?${newParams.toString()}`}
            className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden block hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
          >
            <img
              src={item.imageUrl}
              alt={item.author}
              className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                Photo by <strong>{item.author}</strong>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CardList;
