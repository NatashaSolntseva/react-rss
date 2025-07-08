import { Component } from 'react';
import { UnsplashImage } from '../../api/api';

interface Props {
  items: UnsplashImage[];
}

class CardList extends Component<Props> {
  render() {
    const { items } = this.props;

    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow overflow-hidden"
          >
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
  }
}

export default CardList;
