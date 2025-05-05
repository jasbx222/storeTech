// hooks/useProductWithOffer.js
import { useState, useEffect } from "react";
import { getProductWithOffer } from "../services";
import { useNavigate } from "react-router-dom";

const useProductWithOffer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductWithOffer = async () => {
      try {
        const data = await getProductWithOffer();
        setProducts(data.data);
      } catch (err) {
        navigate("/error");
        setError("");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductWithOffer();
  }, []);

  return { products, loading, error };
};

export default useProductWithOffer;
