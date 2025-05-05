
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "./Offer.css";
import useProductWithOffer from "../../hooks/useProductWithOffer";
import { Link } from "react-router-dom";
import SkeletonOfferCard from "../../components/Loading/SkeletonOfferCard";
import Product from "../NewProduct/BestProduct";

export default function Offers() {
  const [activePage, setActivePage] = React.useState(0);
  const totalPages = 6;

  const { products, loading, error } = useProductWithOffer();

  // if (error) return <div>{error}</div>;

  const calculateDiscountPercentage = (price, price_after) => {
    if (price && price_after) {
      const discount = ((price - price_after) / price) * 100;
      return discount.toFixed(0);
    }
    return 0;
  };

  return (
    <div className="offers-container">
      <div className="container">
      <div className="department-header">
          <h2 className="department-title">تسوق منتجات جديدة!</h2>
          
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="offers-slider"
        >
          {loading
            ? [...Array(3)].map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonOfferCard/>
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id}>
                 <Product product={product} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
