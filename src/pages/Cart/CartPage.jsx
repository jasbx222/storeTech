

import React, { useState,useEffect } from "react";
import { Trash2, Minus, Plus, ChevronLeft } from "lucide-react";
import "./Cart.css";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import useCouponCode from "../../hooks/useCheckcode"; 
import useOrder from "../../hooks/useOrder"; 
import GovernoratesDropdown from "../Governorates/GovernoratesList";
import empty from "../../assets/icons/shopping-cart-times.png";
import HeadTitle from "../HeadTitle/HeadTitle";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);
  
  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(20); 
  const { takeCode, loading, couponData, error } = useCouponCode(); 
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);  

  // Initialize the useOrder hook
  const { createOrder, loading: orderLoading, error: orderError, orderData } = useOrder();
  useEffect(() => {
    if (couponData) {
     
      setDiscountValue(couponData.discount); 
      toast.success("تم تطبيق الكوبون بنجاح");
    }
  }, [couponData]);
  
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    if (couponCode) {
      takeCode(couponCode);
    }
  };
  const calculateDiscount = () => {
    if (!couponData) return 0;
  
    const subtotal = calculateSubtotal();
  
    if (couponData.type === 'fixed') {
      return couponData.discount;
    }
  
    if (couponData.type === 'percentage') {
      return (subtotal * couponData.discount) / 100;
    }
  
    return 0;
  };
  
  const applyCoupon = () => {
    if (couponData) {
      setDiscountValue(couponData.discountValue); 
    }
  };

  // Remove item from the cart
  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems)); 
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
   

  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.is_offer && item.price_after ? item.price_after : item.price;
      return total + price * item.quantity;
    }, 0);
  };
  

  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal + deliveryPrice - discount;
  };

  // Handle checkout when the user clicks on "Checkout"
  // const handleCheckout = async () => {
  //   const orderDetails = {
  //     products: cartItems.map(item => ({
  //       id: item.id,
  //       quantity: item.quantity,
  //     })),
  //     coupon_code: couponCode || '', 
  //     address: {
  //       governorate_id: selectedGovernorate,  
  //       "longitude": 31.2357,
  //       "latitude": 30.0444 
  //     },
  //   };

  //   await createOrder(orderDetails);
  // };
  const handleCheckout = async () => {
    const orderDetails = {
      products: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
      coupon_code: couponCode || '',
      address: {
        governorate_id: selectedGovernorate,
        longitude: 31.2357,
        latitude: 30.0444
      },
    };
  
    const response = await createOrder(orderDetails);
  
    if (response?.message === "تم إنشاء الطلب بنجاح") {
      setCartItems([]);
      toast.success("تم إنشاء الطلب بنجاح");
    }
  };
  
  
  return (
    <>
    
      {cartItems.length === 0 ? (
        // ✅ Show when cart is empty
        <div className="empty-cart mt-4">
          <img
            src={empty}
            alt="السلة فارغة"
            style={{ width: "200px", margin: "30px auto", display: "block" }}
          />
          <p className="text-center" style={{ fontSize: "18px", marginTop: "10px" ,fontWeight: "bold",color:'rgba(27, 53, 94, 1)'}}>
          عربة التسوق فارغة.
          </p>
          <Link to="/products" className="continue-shopping">
            استمر في التسوق
          </Link>
        </div>
      ) :(
        <>
        <HeadTitle title="عربة التسوق" />
        <div className="container">
    <div className="cart-container">
     
      {/* Cart Items */}
      <div className="cart-items-container ">
        <div className="cart-header">
          <div className="header-product">المنتج</div>
          <div className="header-price">السعر</div>
          <div className="header-quantity">كمية</div>
          <div className="header-subtotal">المجموع الفرعي</div>
        </div>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-details">
            <div className="item-image">
  <img
    src={item.image?.[0]?.image_url || "/placeholder.svg"}
    alt={item.name}
    width={80}
    height={80}
  />
</div>

              <span className="item-name">{item.name}<br></br> <button
              className="remove-button"
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button></span>
              
            </div>

            <div className="item-price">
  {item.is_offer && item.price_after ? (
    <>
      <span className="old-price">{item.price.toFixed(2)} د.ع</span><br></br>
      <span className="new-price">{item.price_after.toFixed(2)} د.ع</span>
    </>
  ) : (
    <span className="regular-price">{item.price.toFixed(2)} د.ع</span>
  )}
</div>


            <div className="quantity-control">

            <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              
              <span className="quantity-value">{item.quantity}</span>
              <button
  className="quantity-button"
  onClick={() => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      toast.info("تم الوصول للحد الأقصى المتاح من هذا المنتج");
    }
  }}
  aria-label="Increase quantity"
>
  <Plus size={16} />
</button>


            </div>

            <div className="item-subtotal">
              {(item.price * item.quantity).toFixed(2)} د.ع
            </div>

           
          </div>
        ))}
      </div>
       {/* Cart Summary */}
       <div className="cart-summary row justify-content-between align-items-center">
        
        <div className="summary-back col-lg-2 col-md-4 col-sm-12">
          <GovernoratesDropdown 
            setDeliveryPrice={setDeliveryPrice} 
            setSelectedGovernorate={setSelectedGovernorate}  
            style={{ width: '95%' }} 
          />
         
        </div>

        {/* Coupon Section */}
        <div className="discount-section  col-lg-4 col-md-6 col-sm-12">
          <h3>كود الخصم</h3>
          <p className="discount-text">أدخل رمز الخصم الخاص بك واحصل على الخصومات</p>
          <div className="discount-input-group">
            <button className="apply-discount-button" onClick={handleSubmitCoupon}>
              إدخال الكود
            </button>
            <input
              type="text"
              className="discount-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="ادخل الكود"
            />
          </div>
          {error && <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{error}</p>}
        </div>

        {/* Cart Summary Details */}
        <div className="summary-details  col-lg-4 col-md-6 col-sm-12"> 
          <div className="summary-row">
            <span className="summary-label">المجموع الفرعي</span>
            <span className="summary-value">{calculateSubtotal().toFixed(2)} د.ع</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">سعر التوصيل</span>
            <span className="summary-value">{deliveryPrice.toFixed(2)} د.ع</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">قيمة الخصم</span>
            <span className="summary-value">{calculateDiscount().toFixed(2)} د.ع</span>
            {couponData?.type === 'percentage' && (
  <span style={{ fontSize: '13px', color: '#666' }}>
    ({couponData.discount}% خصم)
  </span>
)}

            </div>

          <div className="summary-row total-row">
            <span className="summary-label">المجموع</span>
            <span className="summary-value total-value">{calculateTotal().toFixed(2)} د.ع</span>
          </div>
        </div>

      
      </div>
  {/* Checkout Button */}
  <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={orderLoading} 
        >
          {orderLoading ? "جارى تقديم الطلب..." : "الدفع"}
        </button>

       
        {orderError && <p style={{ color: 'red' }}>{orderError}</p>}
      
        {orderData && (
          <div>
          <p style={{ color: "#30181C", fontSize: "14px", marginTop: "5px" }}>تم إنشاء الطلب بنجاح</p>
          </div>
        )}
    </div>
    </div>
    </>
      )}
    </>
  );
}
