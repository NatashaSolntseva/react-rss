import axios from 'axios';
import { BASE_URL, ACCESS_KEY } from './constants';
import type {
  CardItem,
  UnsplashApiItem,
  UnsplashImageDetails,
  UnsplashSearchResponse,
} from './types';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

function toCardItem(item: UnsplashApiItem): CardItem {
  return {
    id: item.id,
    createdAt: item.created_at,
    imageUrl: item.urls.small,
    alt_description: item.alt_description,
    author: item.user.name,
    likes: item.likes,
    authorUrl: item.user.links.html,
    description: item.description,
  };
}

async function handleAxios<T>(promise: Promise<{ data: T }>): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.status}`);
    }
    throw error;
  }
}

export async function fetchLatestImages(
  page = 1,
  limit = 6
): Promise<CardItem[]> {
  const data = await handleAxios(
    api.get<UnsplashApiItem[]>(`/photos?page=${page}&per_page=${limit}`)
  );
  return data.map(toCardItem);
}

export async function searchImages(
  query: string,
  page = 1,
  limit = 6
): Promise<CardItem[]> {
  const data = await handleAxios(
    api.get<UnsplashSearchResponse>(
      `/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${limit}`
    )
  );
  return data.results.map(toCardItem);
}

export async function fetchPhotoDetails(
  id: string
): Promise<UnsplashImageDetails> {
  return handleAxios(api.get<UnsplashImageDetails>(`/photos/${id}`));
}
