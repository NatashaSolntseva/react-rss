import { useQuery } from '@tanstack/react-query';
import { getSearchImagesQuery } from '@/entities/cardImages/queries';

export const useSearchImages = (query: string, page: number) => {
  return useQuery({
    ...getSearchImagesQuery(query, page),
    enabled: !!query,
  });
};
