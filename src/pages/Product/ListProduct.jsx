import { useEffect } from "react";
import styles from "../tabs/tabs.module.css";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import SecondCard from "../ProductCard/SecondCard";
import SkeletonCard from "../../components/Loading/SkeletonCard";

export default function ListProduct({ sidebarFilters, setProductCount, currentPage, onMetaUpdate }) {
  const { products, loading: loadingProducts, meta } = useFilteredProducts(sidebarFilters, currentPage);

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
          <div>
            {loadingProducts ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              products.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <SecondCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
