import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import useFavorites from '../../hooks/useFavorites';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import 'react-toastify/dist/ReactToastify.css';
import "./Cardstyle.css";

const FirstCard = ({ product }) => {
  const { favorites, refetch } = useFavorites();
  const { toggle } = useToggleFavorite();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);

  const isFavorite = favorites.some(f => f.id === product.id);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
  
    const isLoggedIn = localStorage.getItem("loginInfo") === "true";
  
    if (!isLoggedIn) {
      toast.warning("يجب تسجيل الدخول أولًا لإضافة المنتج إلى المفضلة", {
        autoClose: 3000,
      });
      return;
    }
  
    try {
      await toggle(product.id);
      await refetch();
  
      toast.success("تم تحديث المفضلة بنجاح", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث المفضلة", {
        autoClose: 3000,
      });
    }
  };
  

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
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
  
  
  const imageUrl = product.image?.[0]?.image_url || product.image || '/placeholder.jpg';

  return (
    <div className="products-container" style={{ cursor: "pointer" }}>
      <div className="product-card">
        <div className="product-image-container">
          <button
            className="favorite-button"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorite ? "rgba(0, 12, 142, 1)" : "none"}
              stroke={isFavorite ? "#30181c" : "gray"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="heart-icon"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <img src={imageUrl} alt={product.name} className="product-image"  onClick={handleNavigate} />
        </div>

        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            <span className="discounted-price">{product.price_after || product.price}د.ع</span>
            {product.price_after && product.price && (
              <span className="original-price">{product.price}د.ع</span>
            )}
          </div>
          <button
            className={`add-to-cart-button ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <FaSpinner className="spin-icon" />
            ) : (
              'أضف إلى السلة'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstCard;
