import api from './axios';
import { MemoRequest, MemoResponse } from '../types/Memo';

export const getMemos = async (): Promise<MemoResponse[]> => {
  const response = await api.get<MemoResponse[]>('/api/memos');
  return response.data;
};

export const createMemo = async (memo: MemoRequest): Promise<MemoResponse> => {
  const response = await api.post<MemoResponse>('/api/memos', memo);
  return response.data;
};

export const updateMemo = async (id: number, memo: MemoRequest): Promise<MemoResponse> => {
  const response = await api.put<MemoResponse>(`/api/memos/${id}`, memo);
  return response.data;
};

export const deleteMemo = async (id: number): Promise<void> => {
  await api.delete(`/api/memos/${id}`);
};
