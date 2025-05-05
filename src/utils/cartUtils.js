// src/utils/cartUtils.js
export const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  };
  
  export const getCartCount = () => {
    const cart = getCartItems();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };
  
  export const updateCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  