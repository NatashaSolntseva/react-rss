export interface UnsplashImage {
  id: string;
  imageUrl: string;
  author: string;
}

export interface UnsplashApiUser {
  name: string;
}

export interface UnsplashApiUrls {
  small: string;
}

export interface UnsplashApiPhoto {
  id: string;
  urls: UnsplashApiUrls;
  user: UnsplashApiUser;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashApiPhoto[];
}
