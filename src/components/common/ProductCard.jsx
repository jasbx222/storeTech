import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, oldPrice, image } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        <button className="favorite-button">
          <i className="far fa-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          <span className="current-price">{price} ر.س</span>
          {oldPrice && <span className="old-price">{oldPrice} ر.س</span>}
        </div>
        <Link to={`/product/${id}`} className="add-to-cart">
          أضف إلى السلة
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
