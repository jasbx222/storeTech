import { useState, useEffect } from "react";
import { getAd } from "../services"; // استيراد الخدمة لجلب الإعلانات
import { useNavigate } from "react-router-dom";

const useAds = () => {
  const [AdsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const data = await getAd(); // جلب البيانات من الـ API
        setAdsData(data.data); // تعيين البيانات إلى AdsData
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الإعلانات");
        console.error(err);
        navigate("/error"); // في حال حدوث خطأ يتم إعادة التوجيه إلى صفحة الخطأ
      } finally {
        setLoading(false); // تم الانتهاء من التحميل
      }
    };

    fetchAdsData(); // استدعاء الدالة لتحميل البيانات
  }, []); // هذه الدالة تعمل مرة واحدة عند تحميل المكون

  return { AdsData, loading, error }; // إرجاع البيانات وحالة التحميل والخطأ
};

export default useAds;
