import { useQuery } from '@tanstack/react-query';
import { getSearchImagesQuery } from '@/entities/cardImages/queries';

export const useSearchImages = (query: string, page: number) => {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    ...getSearchImagesQuery(query, page),
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
