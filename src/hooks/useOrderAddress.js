
import { useEffect, useState } from 'react';
import { getOrderAddress } from '../services';

const useOrderAddress = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getOrderAddress();
        setAddress(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  return { address, loading, error };
};

export default useOrderAddress;
