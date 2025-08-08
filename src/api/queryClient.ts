import { QueryClient } from '@tanstack/react-query';
import { STALE_TIME_IN_MINUTES } from './constants';
import { CardItem } from './types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: STALE_TIME_IN_MINUTES,
      placeholderData: (prev: CardItem[] | undefined) => prev,
    },
  },
});
