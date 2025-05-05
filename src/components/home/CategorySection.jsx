import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

const CategorySection = () => {
  const categories = [
    { id: 1, name: 'السماعات', icon: '/icons/headphones.png' },
    { id: 2, name: 'هواتف', icon: '/icons/phones.png' },
    { id: 3, name: 'خواتم', icon: '/icons/rings.png' },
    { id: 4, name: 'الساعات', icon: '/icons/watches.png' },
    { id: 5, name: 'ديكورات', icon: '/icons/decor.png' },
    { id: 6, name: 'اجهزة', icon: '/icons/devices.png' },
    { id: 7, name: 'الملابس', icon: '/icons/clothes.png' },
  ];

  return (
    <section className="category-section">
      <div className="section-header">
        <h2>تسوق من أفضل الأقسام</h2>
        <Link to="/products" className="view-all">عرض الكل</Link>
      </div>
      
      <div className="categories-grid">
        {categories.slice(0, 4).map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-item">
            <div className="category-icon">
              <img src={category.icon} alt={category.name} />
            </div>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
