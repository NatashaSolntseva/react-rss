import { useQuery } from '@tanstack/react-query';
import { getImageDetailsQuery } from '@/entities/cardImages/queries';

export const useImageDetails = (id: string) => {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    ...getImageDetailsQuery(id),
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
