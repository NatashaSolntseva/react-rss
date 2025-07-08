const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
  id: string;
  imageUrl: string;
  author: string;
}

export async function fetchLatestImages(limit = 6): Promise<UnsplashImage[]> {
  const response = await fetch(
    `https://api.unsplash.com/photos?per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();

  return data.map((item: any) => ({
    id: item.id,
    imageUrl: item.urls.small,
    author: item.user.name,
  }));
}

export async function searchImages(
  query: string,
  limit = 6
): Promise<UnsplashImage[]> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search images');
  }

  const data = await response.json();

  return data.results.map((item: any) => ({
    id: item.id,
    imageUrl: item.urls.small,
    author: item.user.name,
  }));
}
