import { FC } from 'react';
import { useSelectionStore } from '@/app/store/selectionStore';

const Flyout: FC = () => {
  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  if (selectedIds.length === 0) return null;

  const handleDownload = () => {
    console.log('Download clicked with:', selectedIds);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 shadow-lg rounded px-6 py-3 flex items-center gap-4 z-50">
      <span className="text-sm">
        {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
      </span>
      <button
        onClick={clearSelection}
        className="px-3 py-1 text-sm rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Unselect all
      </button>
      <button
        onClick={handleDownload}
        className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Download
      </button>
    </div>
  );
};

export default Flyout;
