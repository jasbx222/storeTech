import { useState, useEffect, useMemo } from "react";
import styles from "../tabs/tabs.module.css";
import useCategory from "../../hooks/useCategory";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import FirstCard from "../ProductCard/FirstCard";
import SkeletonCard from "../../components/Loading/SkeletonCard";
import Product from "../NewProduct/BestProduct";
export default function GridCategory({ parentCategoryId, sidebarFilters,setProductCount, activeTabId, setActiveTabId }) {
  const { categories: subCategories, loading: loadingTabs } = useCategory(parentCategoryId);

  const filters = useMemo(() => {
    if (sidebarFilters?.category_id) return sidebarFilters;
    return activeTabId ? { ...sidebarFilters, category_id: activeTabId } : null;
  }, [sidebarFilters, activeTabId]);

  const { products, loading: loadingProducts } = useFilteredProducts(filters);

  
  useEffect(() => {
    if (!loadingProducts && products) {
      setProductCount(products.length);
    }
  }, [products, loadingProducts, setProductCount]);
  
  return (
    <div className={styles.alltabspart}>
      <div className="container">
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {loadingTabs
              ? <div style={{ display: 'flex', gap: '8px' }}>{[1, 2, 3].map((i) => <div key={i} className={styles.tab} />)}</div>
              : subCategories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  className={`${styles.tab} ${activeTabId === category.id ? styles.active : ""}`}
                  onClick={() => setActiveTabId(category.id)}
                >
                  {category.name}
                </button>
              ))}
          </div>
          <div className={styles.productsGrid}>
            {loadingProducts ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className={styles.productCard}>
                  <SkeletonCard />
                </div>
              ))
            ) : (
              products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                 
                  <Product product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
