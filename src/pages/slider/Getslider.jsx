import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import './Getslider.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSlider from '../../hooks/useSlider';
import { Link } from 'react-router-dom';

export default function GetSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const { sliderData, loading, error } = useSlider();
  useEffect(() => {
    if (!loading && swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [loading]);

  if (error) return <div>{error}</div>;

  return (
    <div className="get-slider">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ dynamicBullets: true }}
        className="mySwiper"
      >
        {loading ? (
          [...Array(3)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="skeleton-slide">
                <div className="skeleton skeleton-image" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          sliderData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="slider-image-wrapper">
                <img src={item.image} alt="slider" className="slider-image" />
                <div className="slider-overlay">
                  <div className="slider-content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <button className="btn btn-outline-primary">
                      <Link to={`/product/${item.product.id}`} className="link text-white"> 
                        المزيد من التفاصيل
                      </Link>
                       </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
     
      </Swiper>
    </div>
  );
}
