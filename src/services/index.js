import api from '../api/api';

// Login API route




export const login = async (email, password,fcm_token) => {
  try {
    const response = await api.post('/auth/login', { email, password,fcm_token });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};

// Register API route
export const register = async (email, password, name, birth_date,phone) => {
  try {
    const response = await api.post('/auth/register', { email, password, name, birth_date,phone });
    return response.data; // e.g., return user data
  } catch (error) {
    console.error('Register error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Registration failed. Please try again.');
  }
};


export const checkOtp = async (email,otp) => {
  try {
 
    const response = await api.post(`/auth/otp-check`, { email, otp });
    return response.data;  
  } catch (error) {
    console.error('checkOtp error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to send password reset link.');
  }
};
// Forgot Password API route
export const forgotPassword = async (email) => {
  try {
    
    const response = await api.post(`/auth/forget-password?email=${email}`);
    return response.data;  // e.g., success message
  } catch (error) {
    console.error('Forgot Password error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to send password reset link.');
  }
};
export const resetPassword = async (email, token,password) => {
  try {
   
    const response = await api.post(`/auth/reset-password?email=${email}&token=${token}&password=${password}`);
    return response.data; 
  } catch (error) {
    console.error('Reset Password error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to reset password.');
  }
};


export const changePassword = async (oldPassword, newPassword) => {
  try {
  
    const token = localStorage.getItem('token');

    const response = await api.post('/auth/change-password', {
      old_password: oldPassword,
      password: newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    });

    return response.data;  
  } catch (error) {
    console.error('Change Password error:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to change password.');
  }
};

// Example of fetching user details (optional)
export const getUserDetails = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.get('/profile', {
   
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'An error occurred while fetching user details.');
  }
};


// api/user.js or userService.js
export const updateUserDetails = async (payload) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post('/profile', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error.response || error.message);
    throw new Error(
      error?.response?.data?.message || 'An error occurred while updating user details.'
    );
  }
};


export const checkCouponCode = async (couponCode) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put('/coupon/check', 
      { code: couponCode }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data; 

  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.errors) {
      
      throw new Error(error.response.data.errors.join(", ") || 'Error validating coupon code.');
    }
 
    throw new Error(error.response?.data?.message || 'Error validating coupon code.');
  }
};


export const getGovernorates = async (token) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/governorate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching governorates:', error);
    throw error;
  }
};


export const placeOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token'); 

    const response = await api.post('/order', orderData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error; 
  }
};


export const getOrder = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get('/order', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error; 
  }
};


// Assuming api is already configured with the base URL
export const getSlider = async () => {
  try {
    const response = await api.get('/ads?type=banner'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching slider:', error);
    throw error; 
  }
};
export const getAd = async () => {
  try {
    const response = await api.get('/ads'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error; 
  }
};
export const getTerms = async () => {
  try {
    const response = await api.get('/terms-and-condition'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error; 
  }
};

export const getCategory = async (parent_id = null) => {
  try {
   
    const params = parent_id ? { parent_id } : {};

    const response = await api.get('/category', { params }); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; 
  }
};


export const getLastProducts = async () => {
  try {
    const response = await api.get('/product/last-product'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching last products:', error);
    throw error; 
  }
};

export const getProductWithOffer = async () => {
  try {
    const response = await api.get('/product/product-with-offer');
    return response.data; 
  } catch (error) {
    console.error('Error fetching products with offers:', error);
    throw error; 
  }
};

export const getFilteredProducts = async (filters = {}) => {
  try {
    const {
      category_id,
      sort_by,
      sort_order,
      search,
      price_from,
      price_to,
      page 
    } = filters;

    const params = new URLSearchParams();

    if (Array.isArray(category_id)) {
      category_id
        .filter((id) => !isNaN(id) && Number.isFinite(Number(id)))
        .forEach((id) => params.append('category_id', id));
    } else if (category_id && !isNaN(category_id) && Number.isFinite(Number(category_id))) {
      params.append('category_id', category_id);
    }

    if (sort_by) params.append('sort_by', sort_by);
    if (sort_order) params.append('sort_order', sort_order);
    if (search) params.append('search', search);
    if (price_from !== undefined) params.append('price_from', price_from);
    if (price_to !== undefined) params.append('price_to', price_to);
    if (page !== undefined && !isNaN(page)) params.append('page', page); // ✅ تم تمرير page

    const response = await api.get('/product', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error;
  }
};



export const getOrderAddress = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.get('/order/address', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order address:', error.response || error.message);
    throw new Error(
      error?.response?.data?.message || 'An error occurred while fetching order address.'
    );
  }
};







export const getFavorites = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.get('/favorite', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to load favorites.');
  }
};

// Toggle favorite for a product
export const toggleFavorite = async (productId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.put(`/favorite/toggle/${productId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error toggling favorite for product ${productId}:`, error.response || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to toggle favorite status.');
  }
};

// services/productService.js
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}`);
    return response.data.data; 
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "فشل في تحميل بيانات المنتج.";
    console.error("Error fetching product:", message);
    throw new Error(message);
  }
};



export const getSocial = async () => {
  try {
    const response = await api.get('/social-media-link'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error; 
  }
};
export const getInfo = async () => {
  try {
    const response = await api.get('/contact-info'); // Make sure the endpoint is correct
    return response.data; // Return the response data which contains the contact info
  } catch (error) {
    console.error('Error fetching contact information:', error);
    throw error;
  }
};
