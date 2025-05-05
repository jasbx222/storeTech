import { useState, useEffect } from "react";
import { getFilteredProducts } from "../services";
import { useNavigate } from "react-router-dom";

const useFilteredProducts = (filters, page = 1) => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const data = await getFilteredProducts({ ...filters, page });
        setProducts(data.data || []);
        setMeta(data.meta || null);
      } catch (err) {
        navigate("/error");
        setError("");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filters, page]);

  return { products, meta, loading, error };
};

export default useFilteredProducts;
