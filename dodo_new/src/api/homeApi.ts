import api from './axios';
import { HomeResponse } from '../types/Home';

export const getHomeData = async (): Promise<HomeResponse> => {
  const response = await api.get<HomeResponse>('/api/home');
  return response.data;
};
