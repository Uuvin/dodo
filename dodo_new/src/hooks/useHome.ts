import { useState, useEffect } from 'react';
import { getHomeData } from '../api/homeApi';
import { HomeResponse } from '../types/Home';

export const useHome = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const result = await getHomeData();
        setData(result);
      } catch (err) {
        setError('홈 데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  return { data, loading, error };
};
