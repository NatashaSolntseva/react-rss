import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/constants';
import {
  mockApiResponse,
  mockPhotoDetails,
  mockSearchResponse,
} from '@/api/__mocks__/mockApiRes';

export const handlers = [
  http.get(`${BASE_URL}/photos`, () => {
    return HttpResponse.json(mockApiResponse);
  }),

  http.get(`${BASE_URL}/search/photos`, () => {
    return HttpResponse.json(mockSearchResponse);
  }),

  http.get(`${BASE_URL}/photos/:id`, () => {
    return HttpResponse.json(mockPhotoDetails);
  }),
];
