import { fetchLatestImages, searchImages, fetchPhotoDetails } from '@/api/api';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/constants';
import { afterEach, describe, expect, it } from 'vitest';
import { mockApiResponse, mockPhotoDetails } from '@/api/__mocks__/mockApiRes';
import { server } from '@/__tests__/setupTests';

describe('UnsplashAPI', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('fetchLatestImages returns mapped items', async () => {
    const result = await fetchLatestImages(1, 1);
    expect(result[0].id).toBe(mockApiResponse[0].id);
  });

  it('searchImages returns results', async () => {
    const result = await searchImages('cat', 1, 1);
    expect(result[0].author).toBe(mockApiResponse[0].user.name);
  });

  it('fetchPhotoDetails returns correct data', async () => {
    const result = await fetchPhotoDetails('123');
    expect(result.id).toBe(mockPhotoDetails.id);
  });

  it('handles 500 error gracefully', async () => {
    const url = `${BASE_URL}/photos`;

    server.use(
      http.get(
        url,
        () =>
          new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
      )
    );

    await expect(fetchLatestImages()).rejects.toThrow('API error: 500');
  });
});
