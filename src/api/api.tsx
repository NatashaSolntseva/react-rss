import { BASE_URL, ACCESS_KEY } from './constants';
import {
  UnsplashApiPhoto,
  UnsplashImage,
  UnsplashSearchResponse,
} from './types';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchLatestImages(
  page = 1,
  limit = 6
): Promise<UnsplashImage[]> {
  const response = await fetch(
    `${BASE_URL}/photos?page=${page}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const data = await handleResponse<UnsplashApiPhoto[]>(response);

  return data.map((item) => ({
    id: item.id,
    imageUrl: item.urls.small,
    author: item.user.name,
  }));
}

export async function searchImages(
  query: string,
  page = 1,
  limit = 6
): Promise<UnsplashImage[]> {
  const response = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const data = await handleResponse<UnsplashSearchResponse>(response);

  return data.results.map((item) => ({
    id: item.id,
    imageUrl: item.urls.small,
    author: item.user.name,
  }));
}
