import { useState } from 'react';
import { placeOrder } from '../services'; 


const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const createOrder = async (orderDetails) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await placeOrder(orderDetails);
  
      if (response?.status === 201 || response?.message === "تم إنشاء الطلب بنجاح") {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
  
      setOrderData(response);
      return response; // ✅ return the response to the caller
    } catch (err) {
      let message = 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.';
  
      if (err.response?.data) {
        const { data } = err.response;
        if (data.message) message = data.message;
        if (data.errors) {
          const firstField = Object.keys(data.errors)[0];
          const firstMessage = data.errors[firstField]?.[0];
          if (firstMessage) message = firstMessage;
        }
      }
  
      setError(message);
      return null; // ✅ return null on error
    } finally {
      setLoading(false);
    }
  };
  
  

  return {
    createOrder,
    loading,
    error,
    orderData,
  };
};




export default useOrder;
