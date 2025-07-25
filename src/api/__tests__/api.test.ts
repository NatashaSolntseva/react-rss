import { fetchLatestImages, searchImages, fetchPhotoDetails } from '../api';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockApiResponse, mockPhotoDetails } from '../../__mocks__/mockApiRes';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Unsplash API', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchLatestImages', () => {
    it('calls the correct URL and returns mapped images', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const result = await fetchLatestImages(2, 3);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/photos?page=2&per_page=3'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Client-ID'),
          }),
        })
      );

      expect(result).toEqual([
        {
          id: mockApiResponse[0].id,
          imageUrl: mockApiResponse[0].urls.small,
          author: mockApiResponse[0].user.name,
        },
      ]);
    });

    it('throws an error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      });

      await expect(fetchLatestImages()).rejects.toThrow('API error: 500');
    });
  });

  describe('searchImages', () => {
    it('calls the search endpoint with query and returns mapped images', async () => {
      const query = 'mountains';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: mockApiResponse }),
      });

      const result = await searchImages(query, 1, 5);

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain('/search/photos');
      expect(calledUrl).toContain(`query=${encodeURIComponent(query)}`);

      expect(result[0].id).toBe(mockApiResponse[0].id);
    });

    it('throws an error if search request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      await expect(searchImages('test')).rejects.toThrow('API error: 403');
    });
  });

  describe('fetchPhotoDetails', () => {
    it('returns photo details on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPhotoDetails),
      });

      const result = await fetchPhotoDetails('abc123');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/photos/abc123'),
        expect.any(Object)
      );
      expect(result).toEqual(mockPhotoDetails);
    });

    it('throws error if details fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(fetchPhotoDetails('badid')).rejects.toThrow(
        'API error: 404'
      );
    });
  });
});
