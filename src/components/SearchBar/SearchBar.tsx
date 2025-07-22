import { ChangeEvent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Props {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, initialValue = '' }) => {
  const [term, setTerm, removeTerm] = useLocalStorage(
    'searchTerm',
    initialValue
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = term.trim();

    if (trimmed) {
      setTerm(trimmed);
      onSearch(trimmed);
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    removeTerm();
    setTerm('');
    onSearch('');
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      <input
        className="border rounded px-4 py-2 w-64"
        type="text"
        placeholder="Search for images..."
        value={term}
        onChange={handleChange}
      />
      <button
        className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="bg-gray-300 text-slate-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
