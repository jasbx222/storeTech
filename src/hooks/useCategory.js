import { useState, useEffect } from "react";
import { getCategory } from "../services";
import { useNavigate } from "react-router-dom";

const useCategory = (parent_id = null) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory(parent_id);
        console.log("Fetched categories:", data);
        setCategories(data.data);
      } catch (err) {
        navigate("/error");
        setError("");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [parent_id]);

  return { categories, loading, error };
};

export default useCategory;
