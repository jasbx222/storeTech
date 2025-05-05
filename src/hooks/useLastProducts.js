import { useState, useEffect } from "react";
import { getLastProducts } from "../services";
import { useNavigate } from "react-router-dom";

const useLastProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLastProducts = async () => {
      try {
        const data = await getLastProducts();
        setProducts(data.data);
      } catch (err) {
        navigate("/error");
        setError("");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastProducts();
  }, []);

  return { products, loading, error };
};

export default useLastProducts;
