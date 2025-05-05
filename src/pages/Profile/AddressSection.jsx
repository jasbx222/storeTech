import { Button } from "@mui/material";
import useOrderAddress from '../../hooks/useOrderAddress';
import SkeletonLoader from '../../components/Loading/SkeletonLoader';

const AddressSection = () => {
  const { address, loading, error } = useOrderAddress();

  if (loading) return <SkeletonLoader type="card" count={2} height={100} />;
  // if (error) return <p>حدث خطأ: {error}</p>;
  if (!address?.data?.length) return <p>لا توجد عناوين حالياً</p>;

  return (
    <div className="addresses-section " style={{marginTop:'40px'}}>
      {/* عنوان القسم */}
      <div className="section-header flex justify-between items-center mb-4">
        <div className="section-title-address text-right font-bold text-lg">العنوان</div>
        <div className="edit-button">
          <Button variant="link" className="p-0">إضافة جديد</Button>
        </div>
      </div>

      {/* عرض العناوين */}
      <div className="addresses-container grid grid-cols-1 md:grid-cols-2 gap-4">
        {address.data.map((addr) => (
          <div key={addr.id} className="address-card rounded-lg p-4">
            <div className="address-title text-right font-bold">
              {addr.governorate?.name || '---'}
            </div>

           

            {/* Placeholder full address (لو عندك تفاصيل إضافية من الـ API) */}
            <div className="address-details text-right mb-4">
              الموقع: خط العرض {addr.latitude}, خط الطول {addr.longitude}
            </div>

            <div className="address-actions flex justify-end">
              <Button variant="outlined" className="w-24 text-sm">المنزل</Button>
            </div>

            <div className="address-edit-actions flex justify-end mt-4 space-x-2 space-x-reverse rtl">
              <Button variant="link" className="p-0">حذف</Button>
              <span className="mx-2">|</span>
              <Button variant="link" className="p-0">تعديل</Button>
              <span className="mx-2">|</span>
              <Button variant="link" className="p-0">تعيين كإعداد افتراضي</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;
