import { fetchLatestImages, fetchPhotoDetails, searchImages } from '@/api/api';
import { IMAGES_PER_PAGE } from '@/api/constants';
import { CardItem } from '@/api/types';

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
