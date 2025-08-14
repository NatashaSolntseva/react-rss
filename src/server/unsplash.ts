import 'server-only';
import axios, { AxiosInstance } from 'axios';
import { BASE_URL, IMAGES_PER_PAGE } from './constants';
import {
  CardItem,
  UnsplashApiItem,
  UnsplashImageDetails,
  UnsplashSearchResponse,
} from './types';

function createClient(): AxiosInstance {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error('Missing UNSPLASH_ACCESS_KEY env var');
  }
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Client-ID ${key}`,
    },
  });
}

const api = createClient();

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
  limit = IMAGES_PER_PAGE
): Promise<CardItem[]> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(limit),
  });

  const data = await handleAxios<UnsplashApiItem[]>(
    api.get(`/photos?${params.toString()}`)
  );

  return data.map(toCardItem);
}

export async function searchImages(
  query: string,
  page = 1,
  limit = IMAGES_PER_PAGE
): Promise<{ results: CardItem[]; totalImages: number }> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: String(limit),
  });

  const data = await handleAxios<UnsplashSearchResponse>(
    api.get(`/search/photos?${params.toString()}`)
  );

  return {
    results: data.results.map(toCardItem),
    totalImages: data.total,
  };
}

export async function fetchPhotoDetails(
  id: string
): Promise<UnsplashImageDetails> {
  return handleAxios(api.get(`/photos/${id}`));
}
