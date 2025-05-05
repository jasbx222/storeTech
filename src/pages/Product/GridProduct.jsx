import { useEffect } from "react";
import styles from "../tabs/tabs.module.css";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import FirstCard from "../ProductCard/FirstCard";
import SkeletonCard from "../../components/Loading/SkeletonCard";
import Product from "../NewProduct/BestProduct";

export default function GridProduct({ sidebarFilters, setProductCount, currentPage, onMetaUpdate }) {
  const { products, loading: loadingProducts, meta } = useFilteredProducts(sidebarFilters || {}, currentPage);

  useEffect(() => {
    if (!loadingProducts && products) {
      setProductCount(products.length);
    }
  }, [products, loadingProducts, setProductCount]);

  useEffect(() => {
    if (meta) {
      onMetaUpdate(meta);
    }
  }, [meta, onMetaUpdate]);

  return (
    <div className={styles.alltabspart}>
      <div className="container">
        <div className={styles.tabsContainer}>
          <div className={styles.productsGrid}>
            {loadingProducts ? (
              [...Array(12)].map((_, i) => (
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
