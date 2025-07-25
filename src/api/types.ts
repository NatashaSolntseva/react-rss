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
