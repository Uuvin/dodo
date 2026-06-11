import { useState, useEffect } from 'react';
import { getMemos, createMemo, updateMemo, deleteMemo } from '../api/memoApi';
import { MemoRequest, MemoResponse } from '../types/Memo';

export const useMemo = () => {
  const [memos, setMemos] = useState<MemoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      setLoading(true);
      const result = await getMemos();
      setMemos(result);
    } catch (err) {
      setError('메모를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMemo = async (memo: MemoRequest) => {
    const newMemo = await createMemo(memo);
    setMemos((prev) => [newMemo, ...prev]);
  };

  const editMemo = async (id: number, memo: MemoRequest) => {
    const updated = await updateMemo(id, memo);
    setMemos((prev) => prev.map((m) => (m.id === id ? updated : m)));
  };

  const removeMemo = async (id: number) => {
    await deleteMemo(id);
    setMemos((prev) => prev.filter((m) => m.id !== id));
  };

  return { memos, loading, error, addMemo, editMemo, removeMemo };
};
