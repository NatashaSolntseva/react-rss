import { ChangeEvent, KeyboardEvent } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { AppButton } from '@/shared/ui/AppButton/AppButton';

interface Props {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = '' }: Props) => {
  const [term, setTerm, removeTerm] = useLocalStorage(
    'searchTerm',
    initialValue
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    <div className="mb-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <input
        className="w-64 rounded border bg-white px-4 py-2 text-black focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="Search for images..."
        value={term}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-2 flex gap-2 sm:mt-0">
        <AppButton text="Search" onClick={handleSearch} />
        <AppButton text="Reset" onClick={handleReset} />
      </div>
    </div>
  );
};
