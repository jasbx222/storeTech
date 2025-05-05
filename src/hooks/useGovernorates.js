import { useState, useEffect } from 'react';
import { getGovernorates } from '../services'; 

const useGovernorates = () => {
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const data = await getGovernorates();
        setGovernorates(data.data);
        setLoading(false);
      } catch (error) {
        setError('');
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, []);

  return { governorates, loading, error };
};

export default useGovernorates;
