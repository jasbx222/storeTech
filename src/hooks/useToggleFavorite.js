
import { useState } from 'react';
import { toggleFavorite } from '../services'; 

const useToggleFavorite = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const toggle = async (productId) => {
    setUpdating(true);
    setError(null);

    try {
      await toggleFavorite(productId);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return { toggle, updating, error };
};

export default useToggleFavorite;
