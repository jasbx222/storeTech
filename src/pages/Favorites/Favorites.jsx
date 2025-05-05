import React, { useState } from 'react';
import {
  FaThLarge, FaBars, FaTimes, FaChevronDown, FaChevronLeft
} from 'react-icons/fa';
import "./Favorites.css"

import useFavorites from '../../hooks/useFavorites';
import useToggleFavorite from '../../hooks/useToggleFavorite';
import SkeletonLoader from '../../components/Loading/SkeletonLoader';
import FirstCard from '../ProductCard/FirstCard';
import SecondCard from '../ProductCard/SecondCard';
import '../Categories/Categories.css';
import SkeletonCard from '../../components/Loading/SkeletonCard';
import HeadTitle from '../HeadTitle/HeadTitle';
import Product from '../NewProduct/BestProduct';
const GridViewComponent = ({ products, onToggleFavorite }) => (
  <div className="row">
    {products.map((product) => (
      <div key={product.id} className="col-lg-3 col-md-5 mb-4">
        <Product product={product} onToggleFavorite={onToggleFavorite} />
      </div>
    ))}
  </div>
);

const ListViewComponent = ({ products, onToggleFavorite }) => (
  <div className="list justify-between align-items-start">
    {products.map((product) => (
      <div key={product.id} className=" mb-4">
        <SecondCard product={product} onToggleFavorite={onToggleFavorite} />
      </div>
    ))}
  </div>
);


const FavoritesPage = () => {
  const [viewType, setViewType] = useState('grid');
 

  const { favorites, loading, error, refetch } = useFavorites(); 
  const { toggle, updating } = useToggleFavorite();

  const handleToggleFavorite = async (productId) => {
    await toggle(productId);
    await refetch(); 
  };

  return (
    <>
      <HeadTitle title="المفضلة" />
     {favorites.length === 0 ? (
      <div className="empty-favorites text-center " style={{margin:'100px auto'}}>
       
        <p style={{ fontSize: "18px",fontWeight: "bold",color:'#30181C' }}>
          لا يوجد منتجات مفضلة حتى الآن
        </p>
      </div>
    ) : (
    <div className="category-page favorites">
    <div className="container">
      <div className="row-layout row justify-between align-items-start">
      

        <div className={`content-view  'col-lg-12`}>
          <div className="view-toggle">
            <div className="rightpart-content">
              
              <button
                onClick={() => setViewType('list')}
                className={viewType === 'list' ? 'active' : ''}
              >
                <FaBars />
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={viewType === 'grid' ? 'active' : ''}
              >
                <FaThLarge />
              </button>
            </div>
            <div className="left-part-content">
              {loading ? '...جاري التحميل' : `لقد وجدنا لك ${favorites.length} `} <span className="bold">عنصر</span>
            </div>
          </div>

          {loading ? (
<div className="skeleton-wrapper">
  {[...Array(5)].map((_, index) => (
    <SkeletonCard key={index} />
  ))}
</div>
) : viewType === 'grid' ? (
<GridViewComponent products={favorites} onToggleFavorite={handleToggleFavorite} />
) : (
<ListViewComponent products={favorites} onToggleFavorite={handleToggleFavorite} />
)}

        </div>
      </div>
    </div>
  </div>
    
  )}
  
    </>
  );
};

export default FavoritesPage;
