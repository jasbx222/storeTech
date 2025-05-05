import { useState, useEffect } from "react";
import { getSocial } from "../services"; // Use the getSocial function to fetch data
import { useNavigate } from "react-router-dom";

const useSocial = () => {
  const [SocialData, setSocialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const data = await getSocial(); // Fetch dynamic data
        console.log("Fetched data:", data); // Log the fetched data to verify its structure
        if (Array.isArray(data)) {
          setSocialData(data); // Set the dynamic social data if it's an array
        } else if (data?.data && Array.isArray(data.data)) {
          setSocialData(data.data); // Access 'data' property if it's wrapped inside another object
        } else {
          setError("Invalid social data format.");
        }
      } catch (err) {
        setError("Failed to load social media links. Please try again.");
        navigate("/error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialData();
  }, []);

  return { SocialData, loading, error };
};

export default useSocial;
