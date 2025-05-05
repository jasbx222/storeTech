import React, { useState } from "react";
import styles from "./tabs.module.css";
import FirstCard from "../ProductCard/FirstCard";
import useCategory from "../../hooks/useCategory";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import SkeletonCard from "../../components/Loading/SkeletonCard"; 

export default function TabsDepartment() {
  const [activeTab, setActiveTab] = useState("");
  const [filters, setFilters] = useState({
    category_id: 2,
    sort_by: "price",
    sort_order: "asc",
    search: "",
  });

  const { categories, loading, error } = useCategory();
  const { products, loading: productLoading, error: productError } = useFilteredProducts(filters);

  const handleTabChange = (categoryId) => {
    setActiveTab(categoryId);
    setFilters((prevFilters) => ({ ...prevFilters, category_id: categoryId }));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (error || productError) return <div>{error || productError}</div>;

  return (
    <div className={styles.alltabspart}>
      <div className="container">
        <div className={styles.tabsContainer}>
          {/* <div className="best-products-header">
            <h2 className="department-title">قسم الملابس</h2>
            <a href="/all-products" className="view-all">
              <span>عرض الكل</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="chevron-icon">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div> */}

          {/* Tabs */}
          <div className={styles.tabs}>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className={styles.tab} style={{ background: "#eee", height: "32px", width: "80px", borderRadius: "4px" }} />
                ))
              :  categories.slice(0, 5).map((category) => (
             
                  <button
                    key={category.id}
                    className={`${styles.tab} ${activeTab === category.id ? styles.active : ""}`}
                    onClick={() => handleTabChange(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
          </div>

          {/* Products */}
          <div className={styles.productsGrid}>
            {(loading || productLoading)
              ? [...Array(10)].map((_, index) => (
                  <div key={index} className={styles.productCard}>
                    <SkeletonCard />
                  </div>
                ))
              : products.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <FirstCard product={product} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
