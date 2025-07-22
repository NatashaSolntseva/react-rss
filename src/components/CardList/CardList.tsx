import { FC } from 'react';
import { UnsplashImage } from '../../api/types';

interface Props {
  items: UnsplashImage[];
}

const CardList: FC<Props> = ({ items }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded shadow overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.author}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Photo by <strong>{item.author}</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
