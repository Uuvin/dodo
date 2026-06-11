export interface MemoRequest {
  content: string;
  color: string;
}

export interface MemoResponse {
  id: number;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}
