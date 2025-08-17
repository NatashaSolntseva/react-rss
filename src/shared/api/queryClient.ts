import { QueryClient } from '@tanstack/react-query';
import { STALE_TIME_IN_MINUTES } from './constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: STALE_TIME_IN_MINUTES,
    },
  },
});
