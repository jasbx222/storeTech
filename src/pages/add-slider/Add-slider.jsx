import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import useAds from "../../hooks/useAds"; // استيراد هوك الإعلانات

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Add-slider.css";

// Custom Hook for Media Query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default function AddSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { AdsData, loading, error } = useAds(); // جلب البيانات من هوك الإعلانات

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (error) return <div>حدث خطأ أثناء تحميل الإعلانات.</div>; // عرض الخطأ في حال حدوثه

  return (
    <div className="container">
      <div className="add-slider-container">
        {loading ? (
          <div className="skeleton-loader">
            {/* Skeleton loader for each slide */}
            <div className="skeleton-slide">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              type: "bullets",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSlideChange={handleSlideChange}
            className="product-swiper"
            dir="rtl"
          >
            {AdsData.map((item) => {
              if (!item.product) return null; // إذا لم يوجد منتج، إخفاء الشريحة بالكامل

              return (
                <SwiperSlide key={item.id}>
                  <div className="product-slide">
                    <div className="product-info-container">
                      <div className="product-info-content">
                        <h3 className="product-category">{item.product.name}</h3>
                        <h2 className="product-name">{item.product.name}</h2>
                        <h4 className="product-description-title">{item.product.description}</h4>
                        <p className="product-description">{item.product.description}</p>
                        <button className="add-to-cart-button">اضف الى السلة</button>
                      </div>
                    </div>

                    {/* عرض صورة الإعلان */}
                    <div className="product-image-slider">
                      <img
                        src={item.image || "/placeholder.svg"} // عرض الصورة أو صورة بديلة إذا لم تكن موجودة
                        alt={item.title}
                        className="product-image-slider-img"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
}
