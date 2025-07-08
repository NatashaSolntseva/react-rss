import { Component } from 'react';

class CardList extends Component {
  render() {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white rounded shadow overflow-hidden">
          <img
            src="https://source.unsplash.com/random/800x600?sig=1"
            alt="Mock"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Photo by <strong>Mock Author</strong>
            </p>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <img
            src="https://source.unsplash.com/random/800x600?sig=2"
            alt="Mock"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Photo by <strong>Mock Author</strong>
            </p>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <img
            src="https://source.unsplash.com/random/800x600?sig=2"
            alt="Mock"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Photo by <strong>Mock Author</strong>
            </p>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <img
            src="https://source.unsplash.com/random/800x600?sig=2"
            alt="Mock"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Photo by <strong>Mock Author</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CardList;
