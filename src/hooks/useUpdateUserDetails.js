
import { useState } from 'react';
import { updateUserDetails } from '../services'; 

const useUpdateUserDetails = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (userData) => {
    setUpdating(true);
    setError(null);
    setSuccess(false);
    try {
      await updateUserDetails(userData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return { updateUser, updating, error, success };
};

export default useUpdateUserDetails;
