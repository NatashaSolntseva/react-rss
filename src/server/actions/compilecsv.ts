'use server';

import { formatDate } from '@/shared/utils/formatDate';
import type { CardItem } from '@/server/types';

function formatCsvCell(cell: string | number | null): string {
  const str = String(cell ?? '');
  if (str.includes(',') || str.includes(' ') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function compileCsvOnServer(items: CardItem[]) {
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

  return csvContent;
}
