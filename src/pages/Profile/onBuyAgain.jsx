import React from 'react';
import "./Profile.css";

const BuyAgain = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="buy-again-list">
      {products.map((product) => {
        const imageUrl = product.image?.[0]?.image_url || '';
        const total = product.price_after * product.quantity;

        return (
          <div key={product.id} className="item-container mb-3">
            <div className="item-info">
              <div className="item-image">
                <img src={imageUrl} alt={product.name} />
              </div>
              <div className="item-details">
                <h6>{product.name}</h6>
                {/* <b>{product.description?.slice(0, 60)}{product.description?.length > 60 ? '...' : ''}</b> */}
                <b>السعر: <span>{product.price_after} ر.س</span></b><br></br>
                <b>الكمية: <span>{product.quantity}</span></b><br></br>
                <b>المجموع: <span>{total} ر.س</span></b>
              </div>
            </div>
            <button
              className="reorder-btn"
              onClick={() => console.log("Buy again clicked for", product.name)}
            >
              اشتري مرة أخرى
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BuyAgain;
