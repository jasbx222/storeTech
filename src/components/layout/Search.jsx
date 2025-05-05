import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Sidebar.css';  // Importing the CSS file

import useHeaderSearch from '../../hooks/useHeaderSearch';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {
    query,
    setQuery,
    results: searchResults,
    loading: loadingSearch,
  } = useHeaderSearch();

  return (
    <div className="sidbarsearch">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Close Button */}
          <div className='topsidbar'>
            <h4>ابحث في موقعنا</h4>
            <button className="close-btn" onClick={toggleSidebar}>
              &#x2715; {/* Close icon (X) */}
            </button>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="البحث عن منتج..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}  // Update the query state as user types
              className="search-input"
            />
            <button onClick={toggleSidebar}><FaSearch /></button>
          </div>

          {/* Display results only if there's a query */}
          <div className="search-results">
            {query.trim() === '' ? (
              // No results and no skeletons shown if the query is empty
              <h4 className="no-results">ابدأ بالبحث عن منتج...</h4>
            ) : loadingSearch ? (
              <div className="search-skeletons">
                {[1, 2, 3].map((i) => (
                  <div className="skeleton-item" key={i}>
                    <div className="skeleton-img" />
                    <div>
                      <div className="skeleton-text" style={{ width: '100px' }} />
                      <div className="skeleton-text" style={{ width: '60px', marginTop: '8px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="search-result">
                <h4>نتائج البحث</h4>
                {searchResults.map((product) => (
                  <li key={product.id} className="search-result-item">
                    <Link to={`/product/${product.id}`} onClick={() => toggleSidebar()}>
                      <img
                        src={product.image?.[0]?.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="search-result-image"
                      />
                      <div>
                        <b>{product.name}</b><br />
                        <span>{product.price} د.ع</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results">لم يتم العثور على منتجات</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
