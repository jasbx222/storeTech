import { useState, useEffect } from "react";
import { getOrder } from "../services";
import { useNavigate } from "react-router-dom";
const useGetOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const fetchOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getOrder();
      setOrderData(data);
    } catch (err) {
      navigate("/error");
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    loading,
    orderData,
    error,
  };
};

export default useGetOrder;
