// hooks/useAddToCart.js
import { useState } from 'react';
import { toast } from 'react-toastify';

const useAddToCart = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("loginInfo") === "true";
    
    if (!isLoggedIn) {
      toast.warning("يجب تسجيل الدخول أولًا لإضافة المنتج إلى السلة");
      return; 
    }
    
    setIsAdding(true);
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const currentItem = existingCart[existingProductIndex];
      if (currentItem.quantity < currentItem.stock) {
        existingCart[existingProductIndex].quantity += 1;
      }
    } else {
      const { quantity: stockFromApi, ...cleanedProduct } = product;
      existingCart.push({
        ...cleanedProduct,
        quantity: 1,
        stock: stockFromApi, 
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    setTimeout(() => {
      setIsAdding(false);
      toast.success('تمت إضافة المنتج إلى السلة');
    }, 2000);
  };

  return { isAdding, handleAddToCart };
};

export default useAddToCart;
