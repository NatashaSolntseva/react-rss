import { BASE_URL, ACCESS_KEY } from './constants';
import type {
  CardItem,
  UnsplashApiItem,
  UnsplashImageDetails,
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
): Promise<CardItem[]> {
  const response = await fetch(
    `${BASE_URL}/photos?page=${page}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const data = await handleResponse<UnsplashApiItem[]>(response);

  return data.map((item) => ({
    id: item.id,
    createdAt: item.created_at,
    imageUrl: item.urls.small,
    alt_description: item.alt_description,
    author: item.user.name,
    likes: item.likes,
    authorUrl: item.user.links.html,
    description: item.description,
  }));
}

export async function searchImages(
  query: string,
  page = 1,
  limit = 6
): Promise<CardItem[]> {
  const response = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const data = await handleResponse<UnsplashSearchResponse>(response);

  return data.results.map((item) => ({
    id: item.id,
    createdAt: item.created_at,
    imageUrl: item.urls.small,
    alt_description: item.alt_description,
    author: item.user.name,
    likes: item.likes,
    authorUrl: item.user.links.html,
    description: item.description,
  }));
}

export async function fetchPhotoDetails(
  id: string
): Promise<UnsplashImageDetails> {
  const response = await fetch(`${BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  return handleResponse<UnsplashImageDetails>(response);
}
