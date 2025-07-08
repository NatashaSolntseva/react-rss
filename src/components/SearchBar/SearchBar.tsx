import { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="flex justify-center gap-2 mb-6">
        <input
          className="border rounded px-4 py-2 w-64"
          type="text"
          placeholder="Search for images..."
        />
        <button className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700">
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
