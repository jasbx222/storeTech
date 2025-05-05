import React, { useState, useEffect, useMemo } from 'react';
import { FaThLarge, FaBars, FaTimes } from 'react-icons/fa';
import { HiSortDescending } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import '../Categories/Categories.css';
import useCategory from "../../hooks/useCategory";
import Pagination from '../../components/common/Pagination';
import FilterSidebar from '../Filter/FilterSidebar';
import useFilterState from '../../hooks/useFilterState';
import useCategoryStructure from '../../hooks/useCategoryStructure';
import GridProduct from './GridProduct';
import ListProduct from './ListProduct';
import HeadTitle from '../HeadTitle/HeadTitle';
import arrow from '../../assets/icons/arrow.png';
const SidebarFilterBox = ({
  show,
  pendingFilters,
  setPendingFilters,
  applyFilters,
  categories,
  toggleSection,
  toggleSubcategory,
  resetFilters
}) => {
  return (
    <div className={`sidebar-filter-box mb-4 ${show ? 'show' : ''}`}>
      <FilterSidebar
        pendingFilters={pendingFilters}
        setPendingFilters={setPendingFilters}
        applyFilters={applyFilters}
        categories={categories}
        toggleSection={toggleSection}
        toggleSubcategory={toggleSubcategory}
        resetFilters={resetFilters}
      />
    </div>
  );
};

const ShowProducts = () => {
  const { id: categoryId } = useParams();
  const [viewType, setViewType] = useState('grid');
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const {
    pendingFilters,
    setPendingFilters,
    appliedFilters,
    applyFilters,
    toggleSection,
    toggleSubcategory,
    resetFilters
  } = useFilterState();

  const { structuredCategories } = useCategoryStructure();
  const [activeTabId, setActiveTabId] = useState(null);
  const { categories: subCategories, loading: loadingTabs } = useCategory(categoryId);

  useEffect(() => {
    if (!activeTabId && subCategories.length > 0 && !appliedFilters?.category_id) {
      setActiveTabId(subCategories[0].id);
    }
  }, [activeTabId, subCategories, appliedFilters]);

  const sidebarFilters = useMemo(() => {
    return appliedFilters || {};
  }, [appliedFilters]);

  useEffect(() => {
    if (!activeTabId && structuredCategories.length > 0 && !sidebarFilters?.category_id) {
      setActiveTabId(structuredCategories[0].id);
    }
  }, [structuredCategories, activeTabId, sidebarFilters, setActiveTabId]);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleMeta = (meta) => {
    setTotalPages(meta?.last_page || 1);
  };

  return (
    <>
    <HeadTitle title='المنتجات'/>
   
    <div className="category-page">
      <div className="container">
        <div className="row-layout row justify-between align-items-start" style={{ margin: '10px 0' }}>
          <SidebarFilterBox
            show={showSidebar}
            pendingFilters={pendingFilters}
            setPendingFilters={setPendingFilters}
            applyFilters={applyFilters}
            categories={structuredCategories}
            toggleSection={toggleSection}
            toggleSubcategory={toggleSubcategory}
            resetFilters={resetFilters}
          />
          <div className={`content-view ${showSidebar ? 'col-lg-9' : 'col-lg-12'}`}>
            <div className="view-toggle">
              <div className="rightpart-content">
                <button onClick={() => setShowSidebar(!showSidebar)} className='filter'>
                 {showSidebar ? <FaTimes /> : <HiSortDescending />} <span>فرز حسب : مميز</span>  <img src={arrow} alt=''/>
                </button>
                <button onClick={() => setViewType('list')} className={viewType === 'list' ? 'active' : ''}><FaBars /></button>
                <button onClick={() => setViewType('grid')} className={viewType === 'grid' ? 'active' : ''}><FaThLarge /></button>
              </div>
              <div className="left-part-content">
                {productCount > 0
                  ? <>لقد وجدنا لك <span>{productCount}</span> عنصر{productCount > 1 ? 'ًا' : ''}!</>
                  : <>لم يتم العثور على أي عنصر!</>
                }
              </div>
            </div>

            {viewType === 'grid' ? (
              <GridProduct
                sidebarFilters={sidebarFilters}
                setProductCount={setProductCount}
                currentPage={currentPage}
                onMetaUpdate={handleMeta}
              />
            ) : (
              <ListProduct
                sidebarFilters={sidebarFilters}
                setProductCount={setProductCount}
                currentPage={currentPage}
                onMetaUpdate={handleMeta}
              />
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default ShowProducts;
