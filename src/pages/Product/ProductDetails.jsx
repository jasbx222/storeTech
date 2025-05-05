
import React from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import DetailsCard from "./DetailsCard";
import SkeletonListCard from "../../components/Loading/SkeletonListCard";
import Offers from "../offer/Offer";
import Product from "../NewProduct/BestProduct";
import SecondCard from "../ProductCard/SecondCard";

const ProductDetails = () => {
  const { product_id } = useParams();
  const { product, loading, error } = useProductDetails(product_id);

  // if (error) return <div>{error}</div>;

  return (
    <>
    <div className="product-details-page">
    <div className="container">
    <div className="details">
      {loading ? (
        <div className="loading-skeleton-wrapper">
          {[...Array(1)].map((_, i) => (
            
            <SkeletonListCard key={i}/>
          ))}
        </div>
      ) : (
      
        <SecondCard product={product} />
      )}
    </div>
    </div>
    </div>
    <Offers/>
    </>
  );
};

export default ProductDetails;
