import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/formatDate';

describe('formatDate', () => {
  it('formats date string into dd-mm-yyyy format', () => {
    const input = '2023-12-05T10:30:00Z';
    const result = formatDate(input);
    expect(result).toBe('05-12-2023');
  });

  it('pads single-digit day and month with leading zeros', () => {
    const input = '2023-01-09T00:00:00Z';
    const result = formatDate(input);
    expect(result).toBe('09-01-2023');
  });

  it('handles invalid date input gracefully (returns "NaN-NaN-NaN")', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('NaN-NaN-NaN');
  });
});
