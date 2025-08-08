import { useQuery } from '@tanstack/react-query';

import { IMAGES_PER_PAGE } from '@/api/constants';
import { getLatestImagesQuery } from '@/entities/cardImages/queries';

export const useLatestImage = (
  page: number,
  limit = IMAGES_PER_PAGE,
  enabled = true
) => {
  return useQuery({
    ...getLatestImagesQuery(page, limit),
    enabled,
  });
};
