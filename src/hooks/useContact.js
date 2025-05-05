import { useState, useEffect } from "react";
import { getInfo } from "../services"; // Correct function to get contact info data
import { useNavigate } from "react-router-dom";

const useContactInfo = () => {
  const [InfoData, setInfoData] = useState(null); // Initialize as null since data is an object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfoData = async () => {
      try {
        const data = await getInfo(); // Fetch the contact data
        console.log("Fetched contact data:", data); // Log the data to verify structure

        if (data?.data) {
          setInfoData(data.data); // Set the actual data from the response
        } else {
          setError("Invalid data format received.");
        }
      } catch (err) {
        setError("Failed to load contact information. Please try again.");
        navigate("/error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfoData();
  }, []);

  return { InfoData, loading, error };
};

export default useContactInfo;
