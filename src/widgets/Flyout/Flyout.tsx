import { useMemo } from 'react';
import { useSelectionStore } from '@/app/store/selectionStore';

import { downloadCsv } from '@/shared/utils/downloadCsv';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { CardItem } from '@/server/types';

export const Flyout = () => {
  const selectedIds = useSelectionStore((state) => state.selectedIds);
  const selectedItemsMap = useSelectionStore((state) => state.selectedItemsMap);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  const selectedItems: CardItem[] = useMemo(
    () =>
      selectedIds
        .map((id) => selectedItemsMap[id])
        .filter((item): item is CardItem => Boolean(item)),
    [selectedIds, selectedItemsMap]
  );

  const handleDownload = () => {
    downloadCsv(selectedItems);
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded border border-gray-300 bg-white px-6 py-3 text-black shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <span className="text-sm">
        {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
      </span>
      <AppButton text="Unselect all" onClick={clearSelection} />
      <AppButton text=" Download" onClick={handleDownload} />
    </div>
  );
};
