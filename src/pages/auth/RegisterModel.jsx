import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  OutlinedInput,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin, useRegister, useCheckOtp } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import header from "../../assets/icons/header-logo.png";
import "./AuthModal.css";

const RegisterModel = ({ open, handleClose, openForgotPassword }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpVerification, setIsOtpVerification] = useState(false); // OTP step state
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcm_token] = useState("123");
  const [name, setName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const { loginUser, loading: loginLoading } = useLogin();
  const { registerUser, loading: registerLoading } = useRegister();
  const { checkOtpHandler, loading: otpLoading } = useCheckOtp();

 React.useEffect(() => {
  if (open) {
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setBirthDate("");
    setOtp("");
    setIsOtpVerification(false);
    setShowPassword(false);
    setIsLogin(false);
  }
}, [open]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setIsOtpVerification(false); 
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setBirthDate("");
    setOtp("");
  };

  const handleFormSubmit = async () => {
    if (isLogin) {
      try {
        await loginUser(email, password, fcm_token);

        handleClose();
      } catch (error) {
        toast.error("فشل في تسجيل الدخول. يرجى التحقق من بياناتك.");
      }
    } else {
      try {
        const response = await registerUser(
          email,
          password,
          name,
          birth_date,
          phone
        );

        // If registration is successful, show OTP input
        if (response?.message) {
          toast.success(response.message); // Show API success message
          setIsOtpVerification(true); // Show OTP verification step
        }
      } catch (error) {
        toast.error("فشل في التسجيل. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await checkOtpHandler(email, otp);

      // handleClose();
      setIsOtpVerification(false);

      setIsLogin(true);
    } catch (error) {
      toast.error("فشل في التحقق من الرمز. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="auth-modal">
      <Box className="modal-container">
        <Box className="right-panel">
          <img
            src={header}
            alt="Logo"
            className="logo"
            style={{ marginBottom: "20px" }}
          />
          <p className="wel-text">
            {isOtpVerification
              ? "أدخل رمز OTP للتحقق"
              : isLogin
              ? "سجّل دخولك مع Store Tech App"
              : "أنشئ حسابك مع Store Tech App"}
          </p>

          {/* OTP Verification Fields */}
          {isOtpVerification ? (
            <>
              <FormControl fullWidth style={{ margin: "4px 0" }}>
                <label>رمز التحقق</label>
                <OutlinedInput
                  type="text"
                  placeholder="أدخل رمز OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormControl>

              <Button
                variant="contained"
                className="submit-button"
                fullWidth
                onClick={handleOtpSubmit}
                disabled={otpLoading}
              >
                تحقق من الرمز
              </Button>
            </>
          ) : (
            <>
              {/* Register Fields (only visible when not isLogin) */}
              {!isLogin && (
                <>
                  <FormControl fullWidth style={{ marginBottom: "10px " }}>
                    <label>الاسم</label>
                    <OutlinedInput
                      placeholder="الاسم بالكامل"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: "10px " }}>
                    <label>تاريخ الميلاد</label>
                    <OutlinedInput
                      type="date"
                      value={birth_date}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </FormControl>
                </>
              )}

              {/* Common Fields (Email and Password) */}
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <label>البريد الالكتروني</label>
                <OutlinedInput
                  type="email"
                  placeholder="البريد الإلكتروني"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              {!isLogin && (
                <FormControl fullWidth style={{ marginBottom: "10px " }}>
                  <label>رقم الهاتف</label>
                  <OutlinedInput
                    placeholder="رقم الهاتف"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
              )}

              <FormControl fullWidth style={{ marginBottom: "10px " }}>
                <label>كلمة المرور</label>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Forgot Password */}
              {isLogin && (
                <Typography
                  textAlign="right"
                  marginTop="10px"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  style={{
                    textDecoration: "underline",
                    color: "var(--secondary-color)",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    handleClose(); // Close Login Modal
                    openForgotPassword(); // Open Forgot Password Modal
                  }}
                >
                  نسيت كلمة المرور؟
                </Typography>
              )}

              <Button
                variant="contained"
                className="submit-button"
                fullWidth
                onClick={handleFormSubmit}
                disabled={isLogin ? loginLoading : registerLoading}
              >
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </Button>

              <Typography textAlign="center" marginTop="10px">
                {isLogin ? "ليس لديك حساب؟" : "هل لديك حساب بالفعل؟"}
                <Button
                  variant="text"
                  onClick={toggleAuthMode}
                  style={{
                    textDecoration: "underline",
                    color: "var(--secondary-color)",
                  }}
                >
                  {isLogin ? "سجل الآن" : "تسجيل الدخول"}
                </Button>
              </Typography>
            </>
          )}
        </Box>
        <Box className="left-panel d-none  d-sm-none d-lg-flex">
          <Box className="box-part">
            <Typography variant="h5" className="left-text">
              تمتع بأفضل تسوق <br></br>و المنتجات
            </Typography>
            <Typography variant="body2">
              اكتشف فرصًا لا حصر لها على Store Tech App ، حيث يتحد العملاء
              والشركات. انضم إلينا على الفور!
            </Typography>
          </Box>
          {!isLogin && (
            <Typography className="text-center">
              يرجى ملء التفاصيل الخاصة بك أدناه لانشاء الحساب
            </Typography>
          )}
          {isLogin && (
            <Typography className="text-center">
              يرجى ملء التفاصيل الخاصة بك أدناه لتسجيل الدخول
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterModel;
