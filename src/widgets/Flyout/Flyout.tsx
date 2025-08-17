'use client';

import { useMemo, useState } from 'react';
import { useSelectionStore } from '@/app/store/selectionStore';
import type { CardItem } from '@/server/types';
import { compileCsvOnServer } from '@/server/actions/compilecsv';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const Flyout = () => {
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const selectedItemsMap = useSelectionStore((s) => s.selectedItemsMap);
  const clearSelection = useSelectionStore((s) => s.clearSelection);

  const [isDownloading, setIsDownloading] = useState(false);

  const selectedItems: CardItem[] = useMemo(
    () =>
      selectedIds
        .map((id) => selectedItemsMap[id])
        .filter((item): item is CardItem => Boolean(item)),
    [selectedIds, selectedItemsMap]
  );

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const csvString = await compileCsvOnServer(selectedItems);
      const filename = `${selectedItems.length}_items.csv`;

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      clearSelection();
    } catch (e) {
      console.error('CSV download failed:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded border border-gray-300 bg-white px-6 py-3 text-black shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <span className="text-sm">
        {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
      </span>
      <AppButton
        text="Unselect all"
        onClick={clearSelection}
        disabled={isDownloading}
      />
      <AppButton
        text="Download"
        onClick={handleDownload}
        disabled={isDownloading}
      />
    </div>
  );
};
