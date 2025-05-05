

import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import "./Profile.css";
import useUserDetails from '../../hooks/useUserDetails';
import useUpdateUserDetails from '../../hooks/useUpdateUserDetails';
import { useState } from "react";
import dayjs from 'dayjs';
import AddressSection from "./AddressSection";
import { useChangePassword } from '../../hooks/useAuth'; 
import SkeletonLoader from '../../components/Loading/SkeletonLoader';

export default function ProfileData() {
  const { user, loading, error,refetch  } = useUserDetails();
  const { updateUser, updating, success, error: updateError } = useUpdateUserDetails();
  const {
    changePasswordHandler,
    loading: changingPassword,
    error: passwordError,
    success: passwordSuccess
  } = useChangePassword();
  const [open, setOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const [fieldKey, setFieldKey] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');

if (loading) return <SkeletonLoader type="text" count={5} />;
  // if (error) return <p>حدث خطأ: {error}</p>;
  if (!user?.data) return <p>لا توجد بيانات</p>;

  const handleOpenEdit = (key, currentValue) => {
    setFieldKey(key);
    setFieldValue(currentValue);
    setOpen(true);
  };

  const handleSave = async () => {
    await updateUser({ [fieldKey]: fieldValue });
    await refetch();
    setOpen(false);
  };
  const { name, email, phone, birth_date } = user.data;
 
  return (
    <div className="profile-info space-y-4">
      
      {/* Name */}
      <div className="info-row flex">
        <div className="col-md-5">
          <div className="info-label">اسمك</div>
          <div className="info-value">{name}</div>
        </div>
        <div className="edit-button mt-2">
          <Button onClick={() => handleOpenEdit('name', name)}>تعديل</Button>
        </div>
      </div>

      {/* Email */}
      <div className="info-row flex">
        <div className="col-md-5">
          <div className="info-label">البريد الإلكتروني</div>
          <div className="info-value">{email}</div>
        </div>
        <div className="edit-button mt-2">
          <Button onClick={() => handleOpenEdit('email', email)}>تعديل</Button>
        </div>
      </div>
{/* Password */}
<div className="info-row flex">
  <div className="col-md-5">
    <div className="info-label">كلمة المرور</div>
    <div className="info-value">******************</div>
  </div>
  <div className="edit-button mt-2">
    <Button onClick={() => setPasswordDialogOpen(true)}>تعديل</Button>
  </div>
</div>

      {/* Phone */}
      <div className="info-row flex">
        <div className="col-md-5">
          <div className="info-label">رقم الهاتف</div>
          <div className="info-value">{phone}</div>
        </div>
        <div className="edit-button mt-2">
          <Button onClick={() => handleOpenEdit('phone', phone)}>تعديل</Button>
        </div>
      </div>

      {/* Birth Date */}
      <div className="info-row flex">
        <div className="col-md-5">
          <div className="info-label">تاريخ الميلاد</div>
          <div className="info-value">{dayjs(birth_date).format('DD/MM/YYYY')}</div>
        </div>
        <div className="edit-button mt-2">
          <Button onClick={() => handleOpenEdit('birth_date', birth_date)}>تعديل</Button>
        </div>
      </div>
<AddressSection/>
      {/* Modal */}
      <Dialog
      className="dialog"
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="sm"
  dir="rtl"
>
  <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
    تعديل {fieldKey === 'birth_date' ? 'تاريخ الميلاد' : fieldKey}
  </DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      autoFocus
      margin="dense"
      value={fieldValue}
      onChange={(e) => setFieldValue(e.target.value)}
      variant="outlined"
      InputProps={{ style: { textAlign: 'right' } }}
    />
    {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
   
    <Button onClick={handleSave} disabled={updating}  className="dialog-custom-button">
      {updating ? 'جاري الحفظ...' : 'حفظ'}
    </Button>
    <Button onClick={() => setOpen(false)}  className="dialog-custom-button">إلغاء</Button>
  </DialogActions>
</Dialog>
<Dialog
  open={passwordDialogOpen}
  onClose={() => setPasswordDialogOpen(false)}
  fullWidth
  maxWidth="sm"
  dir="rtl"
>
  <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
    تغيير كلمة المرور
  </DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      margin="dense"
      type="password"
      placeholder="كلمة المرور الحالية"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
    />
    <TextField
      fullWidth
      margin="dense"
      type="password"
     placeholder="كلمة المرور الجديدة"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />

    {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
    {passwordSuccess && <p className="text-green-600 mt-2">{passwordSuccess}</p>}
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
    <Button
      onClick={async () => {
        await changePasswordHandler(oldPassword, newPassword);
        setOldPassword('');
        setNewPassword('');
        // ممكن تقفل تلقائيًا بعد نجاح
        if (!passwordError) setTimeout(() => setPasswordDialogOpen(false), 1000);
      }}
      disabled={changingPassword}
      className="dialog-custom-button"
    >
      {changingPassword ? 'جاري الحفظ...' : 'حفظ'}
    </Button>
    <Button
      onClick={() => setPasswordDialogOpen(false)}
      className="dialog-custom-button"
    >
      إلغاء
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}
