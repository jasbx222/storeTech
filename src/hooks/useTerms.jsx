import { useState, useEffect } from "react";
import { getTerms } from "../services";
import { useNavigate } from "react-router-dom";

const useTerms = () => {
  const [TermsData, setTermsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const data = await getTerms();
        setTermsData(data.data);
      } catch (err) {
        setError("Failed to load terms and conditions. Please try again.");
        navigate("/error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  return { TermsData, loading, error };
};

export default useTerms;

