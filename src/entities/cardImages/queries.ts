import { fetchLatestImages, fetchPhotoDetails, searchImages } from '@/api/api';
import { IMAGES_PER_PAGE } from '@/api/constants';

const cardImagesQueryKey = 'cardImages';
const imageDetailsQueryKey = 'cardImageDetails';

export const getLatestImagesQuery = (page: number, limit = IMAGES_PER_PAGE) => {
  return {
    queryKey: [cardImagesQueryKey, page],
    queryFn: () => fetchLatestImages(page, limit),
  };
};

export const getSearchImagesQuery = (
  query: string,
  page = 1,
  limit = IMAGES_PER_PAGE
) => ({
  queryKey: [cardImagesQueryKey, 'search', query, page],
  queryFn: () => searchImages(query, page, limit),
  enabled: !!query,
});

export const getImageDetailsQuery = (id: string) => ({
  queryKey: [imageDetailsQueryKey, id],
  queryFn: () => fetchPhotoDetails(id),
  enabled: !!id,
});
