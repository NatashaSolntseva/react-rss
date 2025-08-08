export const BASE_URL = 'https://api.unsplash.com';
export const ACCESS_KEY =
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY ||
  'IXaUZw_5aHMWXIoYxGPyPgoot-_n2YDBv6Rn_KPDzZQ';

export const IMAGES_PER_PAGE = 6;
export const DEFAULT_PAGE = '1';
export const STALE_TIME_IN_MINUTES = 1000 * 60 * 3;
