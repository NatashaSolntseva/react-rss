import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchLatestImages, searchImages } from '../api';
import { BASE_URL } from '../constants';
import { mockApiResponse } from '../../__mocks__/mockApiRes';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('API functions', () => {
  it('fetchLatestImages returns mapped image data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([mockApiResponse]),
        } as Response)
      )
    );

    const result = await fetchLatestImages(1);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/photos?per_page=1`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Client-ID '),
        }),
      })
    );

    expect(result).toEqual([
      {
        id: '123',
        imageUrl: 'https://example.com/image.jpg',
        author: 'John Doe',
      },
    ]);
  });

  it('searchImages returns mapped image data from search results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              results: [mockApiResponse],
            }),
        } as Response)
      )
    );

    const result = await searchImages('cats', 1);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/search/photos?query=cats&per_page=1`,
      expect.any(Object)
    );

    expect(result).toEqual([
      {
        id: '123',
        imageUrl: 'https://example.com/image.jpg',
        author: 'John Doe',
      },
    ]);
  });

  it('throws error on failed request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        } as Response)
      )
    );

    await expect(fetchLatestImages()).rejects.toThrow('API error: 500');
  });
});
