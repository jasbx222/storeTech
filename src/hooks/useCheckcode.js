import { useState } from 'react';
import { checkCouponCode } from '../services'; 

const useCouponCode = () => {
  const [loading, setLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [error, setError] = useState(null);

  const takeCode = async (couponCode) => {
    setLoading(true);
    setError(null);
  
    try {
      const data = await checkCouponCode(couponCode);
      setCouponData(data.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors.code;
        setError(errorMessages ? errorMessages.join(', ') : 'An error occurred');
      } else {
        setError('الكوبون الذى ادخلته غير صالح');
      }
      setLoading(false);
    }
  };
  
  return {
    takeCode,  
    loading,     
    couponData,  
    error,      
  };
};

export default useCouponCode;
