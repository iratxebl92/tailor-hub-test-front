import { api, ApiResponse, RequestOptions } from './api';
import type { Restaurant, Review } from '@/domain/types';

const RESTAURANTS_ENDPOINT = '/restaurants';

// Tipo para crear una review (sin date, se genera en el servidor)
export type CreateReviewData = {
  name: string;
  rating: number;
  comments: string;
};

export const restaurantService = {
  //GET ALL
  async getAll(options?: RequestOptions): Promise<ApiResponse<Restaurant[]>> {
    return api.get<Restaurant[]>(RESTAURANTS_ENDPOINT, options);
  },

  //GET
  async get(id: number | string, options?: RequestOptions): Promise<ApiResponse<Restaurant>> {
    return api.get<Restaurant>(`${RESTAURANTS_ENDPOINT}/${id}`, options);
  },

  //DELETE
  async delete(id: number | string, options?: RequestOptions): Promise<ApiResponse<{ message: string }>> {
    return api.delete<{ message: string }>(`${RESTAURANTS_ENDPOINT}/${id}`, options);
  },

  //POST
  async create(restaurant: Omit<Restaurant, 'id'>, options?: RequestOptions): Promise<ApiResponse<Restaurant>> {
    return api.post<Restaurant, Omit<Restaurant, 'id'>>(RESTAURANTS_ENDPOINT, restaurant, options);
  },

  //PUT
  async update(id: number | string, restaurant: Omit<Restaurant, 'id'>, options?: RequestOptions): Promise<ApiResponse<Restaurant>> {
    return api.put<Restaurant, Omit<Restaurant, 'id'>>(`${RESTAURANTS_ENDPOINT}/${id}`, restaurant, options);
  },

  //POST REVIEW - Añadir comentario a un restaurante
  async addReview(restaurantId: number | string, review: CreateReviewData, options?: RequestOptions): Promise<ApiResponse<Restaurant>> {
    return api.post<Restaurant, CreateReviewData>(`${RESTAURANTS_ENDPOINT}/${restaurantId}/reviews`, review, options);
  },
};
