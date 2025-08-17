export interface UnsplashApiUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashApiUserLinks {
  html: string;
}

export interface UnsplashApiUser {
  name: string;
  links: UnsplashApiUserLinks;
}

export interface UnsplashApiItem {
  id: string;
  created_at: string;
  likes: number;
  description: string | null;
  alt_description: string;
  urls: UnsplashApiUrls;
  user: UnsplashApiUser;
}

export interface CardItem {
  id: string;
  createdAt: string;
  imageUrl: string;
  alt_description: string;
  author: string;
  likes: number;
  authorUrl: string;
  description: string | null;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashApiItem[];
}

export interface UnsplashImageDetails {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  user: {
    name: string;
    portfolio_url: string;
    links: {
      html: string;
    };
  };
  likes: number;
  created_at: string;
}
