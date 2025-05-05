import { useState, useMemo } from 'react';
import useFilteredProducts from './useFilteredProducts';

const useHeaderSearch = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filters = useMemo(() => {
    return query.trim() ? { search: query } : null;
  }, [query]);

  const { products: results, loading } = useFilteredProducts(filters);

  return {
    query,
    setQuery,
    results,
    loading,
    showDropdown,
    setShowDropdown
  };
};

export default useHeaderSearch;
