import {
  fetchLatestImages,
  fetchPhotoDetails,
  searchImages,
} from '@/server/unsplash';
import { IMAGES_PER_PAGE } from '@/server/constants';
import { CardItem } from '@/server/types';

const cardImagesQueryKey = 'cardImages';
const imageDetailsQueryKey = 'cardImageDetails';

export const getLatestImagesQuery = (
  page: number,
  limit = IMAGES_PER_PAGE
) => ({
  queryKey: [cardImagesQueryKey, page],
  queryFn: () => fetchLatestImages(page, limit),
  placeholderData: (prev: CardItem[] | undefined) => prev,
});

export const getSearchImagesQuery = (
  query: string,
  page = 1,
  limit = IMAGES_PER_PAGE
) => ({
  queryKey: [cardImagesQueryKey, 'search', query, page],
  queryFn: () => searchImages(query, page, limit),
  placeholderData: (
    prev: { results: CardItem[]; totalImages: number } | undefined
  ) => prev,
});

export const getImageDetailsQuery = (id: string) => ({
  queryKey: [imageDetailsQueryKey, id],
  queryFn: () => fetchPhotoDetails(id),
});
