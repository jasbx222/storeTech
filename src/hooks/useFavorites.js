import { useEffect, useState } from 'react';
import { getFavorites } from '../services'; 

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        const products = (data?.data || []).map((fav) => fav.product); 
        setFavorites(products);
      } catch (err) {
        setError(err.message );
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFavorites();
    }, []);
  
    return { favorites, loading, error, refetch: fetchFavorites };   
  };
  

export default useFavorites;
