import { useQuery } from '@tanstack/react-query';
import { getImageDetailsQuery } from '@/entities/cardImages/queries';

export const useImageDetails = (id?: string) => {
  return useQuery({
    ...getImageDetailsQuery(id || ''),
    enabled: !!id,
  });
};
