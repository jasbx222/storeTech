
import { useEffect, useState, useCallback } from 'react';
import { getUserDetails } from '../services';

const useUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserDetails();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { user, loading, error, refetch: fetchDetails };
};

export default useUserDetails;
