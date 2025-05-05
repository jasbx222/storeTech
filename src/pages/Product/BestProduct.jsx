import React from "react";
import useLastProducts from "../../hooks/useLastProducts";
import SkeletonCard from "../../components/Loading/SkeletonCard";
import Product from "../NewProduct/BestProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./BestProduct.css";

function BestProducts() {
  const { products, loading, error } = useLastProducts();

  if (error) return <div>{error}</div>; // Handle error scenario

  return (
    <div className="best-products-container">
      <div className="container">
        <div className="department-header">
          <h2 className="department-title">المنتجات الاكثر طلبا</h2>
          <p>شوف المنتجات الاكثر طلبا من اريكه و اختار الاريح الك!</p>
        </div>

        {/* Swiper for Products Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20} // space between cards
          slidesPerView={1} // Default to 1 card per view
          breakpoints={{
            768: { slidesPerView: 2 }, // 2 cards per view on medium screens
            1024: { slidesPerView: 4 }, // 4 cards per view on large screens
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }} // Autoplay with delay of 5 seconds
          className="best-products-slider"
        >
          {loading
            ? [...Array(4)].map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonCard />
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

export default BestProducts;
