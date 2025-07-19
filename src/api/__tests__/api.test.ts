import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as api from '../api';
import { mockApiResponse } from '../../__mocks__/mockApiRes';

vi.mock('../api', async () => {
  return {
    fetchLatestImages: vi.fn(),
    searchImages: vi.fn(),
  };
});

describe('API functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetchLatestImages returns mapped image data', async () => {
    (api.fetchLatestImages as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockApiResponse
    );

    const result = await api.fetchLatestImages(1);

    expect(api.fetchLatestImages).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApiResponse);
  });

  it('searchImages returns mapped image data from search results', async () => {
    (api.searchImages as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockApiResponse
    );

    const result = await api.searchImages('cats', 1);

    expect(api.searchImages).toHaveBeenCalledWith('cats', 1);
    expect(result).toEqual(mockApiResponse);
  });

  it('throws error on failed request', async () => {
    (api.fetchLatestImages as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('API error: 500')
    );

    await expect(api.fetchLatestImages()).rejects.toThrow('API error: 500');
  });
});
