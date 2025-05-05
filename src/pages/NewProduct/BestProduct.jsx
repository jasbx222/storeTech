import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFavorites from "../../hooks/useFavorites";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import { Heart } from "lucide-react";
import "./BestProduct.css"; // Assuming you have a CSS file for styles
const Product = React.memo(({ product }) => {
  const { favorites, refetch } = useFavorites();
  const { toggle } = useToggleFavorite();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = favorites.some((f) => f.id === product.id);

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
      toast.success("تم تحديث المفضلة بنجاح", { autoClose: 2000 });
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث المفضلة", { autoClose: 3000 });
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = useCallback(() => {
    const isLoggedIn = localStorage.getItem("loginInfo") === "true";

    if (!isLoggedIn) {
      toast.warning("يجب تسجيل الدخول أولًا لإضافة المنتج إلى السلة");
      return;
    }

    setIsAdding(true);

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
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

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      setIsAdding(false);
      toast.success("تمت إضافة المنتج إلى السلة");
    }, 2000);
  }, [product]);

  const imageUrl =
    product.image?.[0]?.image_url || product.image || "/placeholder.jpg";

  return (
    <div
      className="card h-100 shadow-sm border-0 position-relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* صورة المنتج */}
      <div
        className="d-flex justify-content-center align-items-center position-relative"
        style={{
          height: "250px",
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }}
        onClick={handleNavigate}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="img-fluid"
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />

        {/* الأزرار فوق الصورة */}
        <div
          className={`position-absolute top-50 start-50 translate-middle text-center transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-primary  btn-sm mx-1 mb-2"
            style={{ width: "200px", height: "40px" }}
            onClick={handleNavigate}
          >
            نظرة سريعة
          </button>
          <button
            className="btn btn-primary btn-fast-look btn-sm mx-1"
            style={{
              width: "200px",
              height: "40px",
              backgroundColor: "#f8f9fa",
              color: "#1b365e",
              border: "1px solid #1b365e",
              transition: "background-color 0.3s, color 0.3s",

              "&:hover": {
                backgroundColor: "#1b365e",
                color: "#fff",
              },
            }}
            onClick={handleAddToCart}
          >
            {isAdding ? (
              <FaSpinner className="spinner-border   spinner-border-sm" />
            ) : (
              "التسوق السريع"
            )}
          </button>
        </div>
      </div>

      {/* زر المفضلة */}
      <button
        className="btn position-absolute top-0 start-0 m-2 bg-white rounded-circle p-2 border-0 shadow"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        onClick={handleToggleFavorite}
      >
        <Heart fill={isFavorite ? "rgba(27, 53, 94, 1)" : "#fff"} />
      </button>

      {/* معلومات المنتج */}
      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text fw-bold text-primary">
          {product.price_after || product.price} د.ع
        </p>
      </div>
    </div>
  );
});

export default Product;
