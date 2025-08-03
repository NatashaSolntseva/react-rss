import type { CardItem } from '@/api/types';
import { formatDate } from '@/utils/formatDate';

function formatCsvCell(cell: string | number | null): string {
  const str = String(cell);
  if (str.includes(',') || str.includes(' ') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const downloadCsv = (items: CardItem[]) => {
  const headers = [
    '"N0"',
    '"ID"',
    '"Created At"',
    '"Author Name"',
    '"Likes"',
    '"Image URL"',
    '"Author Profile"',
    '"Description"',
  ];

  const csvContent = [
    headers.map(formatCsvCell).join(';'),
    ...items.map((item, index) =>
      [
        index + 1,
        item.id,
        formatDate(item.createdAt),
        item.author,
        item.likes,
        item.imageUrl,
        item.authorUrl,
        item.description || '',
      ]
        .map(formatCsvCell)
        .join(';')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const filename = `${items.length}_items.csv`;

  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', filename);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
