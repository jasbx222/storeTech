import { useState, useEffect } from "react";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  checkOtp,
  changePassword,
} from "../services/index";
import { toast } from "react-toastify";

// Custom hook for login

// Custom hook for register
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const registerUser = async (email, password, name, birth_date, phone) => {
    setLoading(true);
    try {
      const data = await register(email, password, name, birth_date, phone);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      toast.error(err?.message || "فشل في التسجيل. يرجى المحاولة مرة أخرى.");
      throw err;
    }
  };

  return {
    registerUser,
    loading,
    user,
  };
};

export const useCheckOtp = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const checkOtpHandler = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await checkOtp(email, otp);
      setMessage(response.message);
      toast.success("تم التحقق من الرمز بنجاح.");
      return response;
    } catch (err) {
      setError(err.message || "فشل في التحقق من الرمز.");
      toast.error(err.message || "فشل في التحقق من الرمز.");
    } finally {
      setLoading(false);
    }
  };

  return {
    checkOtpHandler,
    loading,
    message,
    error,
  };
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginUser = async (email, password, fcm_token) => {
    setLoading(true);
    try {
      const data = await login(email, password, fcm_token);
      setUser(data);
      setLoading(false);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("loginInfo", true);

      toast.success("تم تسجيل الدخول بنجاح!");
      window.location.reload();
    } catch (err) {
      setLoading(false);
      const errorMessage = "فشل في تسجيل الدخول. يرجى التحقق من بياناتك.";
      toast.error(errorMessage);
    }
  };

  return {
    loginUser,
    loading,
    user,
  };
};
// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);

//   const loginUser = async (email, password, fcm_token) => {
//     setLoading(true);
//     try {
//       const data = await login(email, password, fcm_token);
//       setUser(data);
//       setLoading(false);

//       // Save data in cookies
//       Cookies.set('token', data.token, { expires: 7, path: '' });  // Token expires in 7 days
//       Cookies.set('email', email, { expires: 7, path: '' });
//       Cookies.set('name', data.data.name, { expires: 7, path: '' });
//       Cookies.set('loginInfo', true, { expires: 7, path: '' });

//       toast.success("تم تسجيل الدخول بنجاح!");
//     } catch (err) {
//       setLoading(false);
//       const errorMessage = 'فشل في تسجيل الدخول. يرجى التحقق من بياناتك.';
//       toast.error(errorMessage);
//     }
//   };

//   return {
//     loginUser,
//     loading,
//     user,
//   };
// };
// Custom hook for forgot password

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);

  useEffect(() => {
    console.log("showOtpForm updated:", showOtpForm);
  }, [showOtpForm]);

  const forgotPasswordHandler = async (email) => {
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setLoading(false);
      toast.success("تم إرسال رابط استعادة كلمة المرور بنجاح.");

      // Show OTP form after sending the link
      setShowOtpForm(true);
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "فشل في إرسال رابط استعادة كلمة المرور.");
    }
  };

  return {
    forgotPasswordHandler,
    loading,
    message,
    showOtpForm,
  };
};

// Custom hook for reset password
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetPasswordHandler = async (email, token, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await resetPassword(email, token, password);
      setSuccess(response.message || "تم إعادة تعيين كلمة المرور بنجاح!");
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPasswordHandler,
    loading,
    error,
    success,
  };
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const changePasswordHandler = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await changePassword(oldPassword, newPassword);
      setSuccess(response.message || "تم تغيير كلمة المرور بنجاح!");
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تغيير كلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return {
    changePasswordHandler,
    loading,
    error,
    success,
  };
};
