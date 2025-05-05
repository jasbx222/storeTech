

// export default ForgotPasswordModal;
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import header from "../../assets/icons/header-logo.png";
import { useForgotPassword } from "../../hooks/useAuth";  // Import your custom hooks
import { useResetPassword } from "../../hooks/useAuth";  // Import custom hook for reset password
import { toast } from "react-toastify";  // Import the toast for notifications

const ForgotPasswordModal = ({ open, handleClose }) => {
  const [step, setStep] = useState(1);  // Track the step of the process
  const [token, settoken] = useState("");  // OTP input state
  const [password, setPassword] = useState("");  // Password input state
  const [confirmPassword, setConfirmPassword] = useState("");  // Confirm Password input state
  const [showPassword, setShowPassword] = useState(false);  // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Toggle for confirm password visibility
  const [email, setEmail] = useState("");  // Email input state
  const { forgotPasswordHandler, loading, message, showOtpForm } = useForgotPassword();  // Using the custom hook for forgot password
  const { resetPasswordHandler, resetLoading, success, error } = useResetPassword(); // Use resetPassword hook

  const handleNext = async () => {
    if (step === 1) {
      try {
        await forgotPasswordHandler(email);  // استدعاء تابع إرسال الرابط
        if (message) {
          toast.success("تم إرسال رابط استعادة كلمة المرور بنجاح.");
          setStep(2);  // الانتقال للخطوة التالية إذا تم إرسال الرابط بنجاح
        }
      } catch (error) {
        toast.error("فشل في إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.");
      }
    } if (step === 2) {
      if (token.length === 6) {
        try {
          await resetPasswordHandler(email, token, password);  // Use resetPasswordHandler for OTP verification
          if (success) {
            toast.success("تم التحقق من رمز OTP بنجاح.");
            setStep(3);  // Move to next step if OTP is valid
          } else if (message) {
            toast.success(message);  
            handleClose();
          } else {
            toast.error("فشل في التحقق من رمز OTP.");
          }
        } catch (error) {
          toast.error("يرجى إدخال رمز OTP صالح.");
        }
      } else {
        toast.error("يرجى إدخال رمز OTP صالح.");
      }
    
    
    
    }
  };

  useEffect(() => {
    if (showOtpForm) {
      // Ensure the OTP form appears when showOtpForm is true
      setStep(2);  // Set step to 2 to render OTP form if showOtpForm is true
    }
  }, [showOtpForm]);
  const handleResendOtp = async () => {
    try {
      await forgotPasswordHandler(email);  // Trigger sending the reset link again
      toast.success("تم إعادة إرسال رمز التحقق إلى بريدك الإلكتروني.");
    } catch (error) {
      toast.error("فشل في إعادة إرسال رمز التحقق. يرجى المحاولة مرة أخرى.");
    }
  };
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="forgot-password-modal">
      <Box className="modal-container">
        <Box className="right-panel">
          {step === 1 && (
            <>
              <img src={header} alt="Logo" className="logo" style={{ marginBottom: "20px" }} />
              <p className="wel-text" textalign="start">نسيت كلمة السر؟</p>
              <Typography variant="body2" textalign="start" marginBottom="20px">
                لا تقلق، هذا يحدث لنا جميعًا. أدخل بريدك الإلكتروني أدناه لاستعادة كلمة المرور<br></br> الخاصة بك
              </Typography>
              <FormControl fullWidth style={{ margin: "4px 0" }}>
                <label>البريد الالكتروني</label>
                <OutlinedInput
                  type="email"
                  placeholder="البريد الإلكتروني"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button variant="contained" className="submit-button" fullWidth onClick={handleNext} disabled={loading}>
                إرسال
              </Button>
            </>
          )}

          {step === 2 && (  // Show OTP form only if step is 2
            <>
             <img src={header} alt="Logo" className="logo" style={{ marginBottom: "20px" }} />
              <Typography variant="h5" fontWeight="bold" textalign="center" style={{marginBottom:'20px'}}>التحقق من الكود</Typography>
              <Typography variant="body2" textalign="center" marginBottom="20px">
                لقد تم إرسال رمز التحقق إلى بريدك الإلكتروني
              </Typography>
              <FormControl fullWidth style={{ margin: "4px 0" }}>
                <label> أدخل الرمز</label>
                <OutlinedInput
             
                fullWidth
              
                margin="normal"
                value={token}
                onChange={(e) => settoken(e.target.value)}
              />
              </FormControl>
              <FormControl fullWidth style={{ margin: "4px 0" }}>
              <label> أدخل كلمه المرور</label>
              <TextField
                fullWidth
                
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> :  <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </FormControl>
               <Typography textalign="center" marginTop="10px">
                لم تستلم الرمز؟ <Button variant="text" style={{color:'#30181C',padding:'0'}} onClick={handleResendOtp}>
                  إعادة الإرسال
                </Button>
              </Typography>
              <Button variant="contained" className="submit-button" fullWidth onClick={handleNext} disabled={loading}>
                تحقق
              </Button>
             
            </>
          )}

          {step === 3 && (
            <>
              <Typography variant="h5" fontWeight="bold" textalign="center">تعيين كلمة مرور جديدة</Typography>
              <Typography variant="body2" textalign="center" marginBottom="20px">
                أدخل كلمة المرور الجديدة لإعادة تعيين حسابك
              </Typography>
              <TextField
                fullWidth
                label="كلمة المرور الجديدة"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="تأكيد كلمة المرور"
                margin="normal"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" className="submit-button" fullWidth onClick={handleNext} disabled={resetLoading}>
                إعادة تعيين كلمة المرور
              </Button>
              {success && <Typography color="green" textalign="center">{success}</Typography>}
              {error && <Typography color="red" textalign="center">{error}</Typography>}
            </>
          )}

          {step === 4 && (
            <Typography variant="h6" color="green" textalign="center">تم تغيير كلمة المرور بنجاح!</Typography>
          )}
        </Box>

        <Box className="left-panel d-none d-sm-none d-lg-block">
          <Box className="box-part">
            <Typography variant="h5" className="left-text">
              تمتع بأفضل تسوق <br /> و المنتجات
            </Typography>
            <Typography variant="body2">
              اكتشف فرصًا لا حصر لها على Store Tech App ، حيث يتحد العملاء والشركات. انضم إلينا على الفور!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
