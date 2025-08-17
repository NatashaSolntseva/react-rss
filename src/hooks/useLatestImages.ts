import { useQuery } from '@tanstack/react-query';

import { CardItem } from '@/server/types';
import { IMAGES_PER_PAGE } from '@/server/constants';
import { getLatestImagesQuery } from '@/entities/cardImages/queries';

export const useLatestImage = (
  page: number,
  limit = IMAGES_PER_PAGE,
  enabled = true,
  initialData?: CardItem[]
) => {
  return useQuery({
    ...getLatestImagesQuery(page, limit),
    enabled,
    initialData: page === 1 ? initialData : undefined,
  });
};
