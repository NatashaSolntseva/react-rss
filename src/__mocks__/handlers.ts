import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/constants';
import { mockApiResponse, mockPhotoDetails } from '@/api/__mocks__/mockApiRes';

export const handlers = [
  http.get(`${BASE_URL}/photos`, () => {
    return HttpResponse.json(mockApiResponse);
  }),

  http.get(`${BASE_URL}/search/photos`, () => {
    return HttpResponse.json({ results: mockApiResponse });
  }),

  http.get(`${BASE_URL}/photos/:id`, () => {
    return HttpResponse.json(mockPhotoDetails);
  }),
];
