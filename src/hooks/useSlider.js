import { useState, useEffect } from "react";
import { getSlider } from "../services";
import { useNavigate } from "react-router-dom";

const useSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const data = await getSlider();
        setSliderData(data.data);
      } catch (err) {
        navigate("/error");

        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  return { sliderData, loading, error };
};

export default useSlider;
