import React, { useState, useEffect, useMemo } from 'react';
import { FaThLarge, FaBars, FaTimes } from 'react-icons/fa';
import { HiSortDescending } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import './Categories.css';
import useCategory from "../../hooks/useCategory";
import GridCategory from './GridCategory';
import ListCategory from './ListCategory';
import Pagination from '../../components/common/Pagination';
import DepartCircle from './DepartCircle';
import FilterSidebar from '../Filter/FilterSidebar';
import useFilterState from '../../hooks/useFilterState';
import useCategoryStructure from '../../hooks/useCategoryStructure';
import HeadTitle from '../HeadTitle/HeadTitle';

const SidebarFilterBox = ({
  show,
  pendingFilters,
  setPendingFilters,
  applyFilters,
  categories,
  toggleSection,
  toggleSubcategory,
  resetFilters
}) => (
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

const CategoryPage = () => {
  const { id: categoryId } = useParams();
  const [viewType, setViewType] = useState('list');
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
    resetFilters,
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
    if (appliedFilters?.category_id) return appliedFilters;
    if (activeTabId) return { category_id: activeTabId };
    return { category_id: [parseInt(categoryId)] };
  }, [appliedFilters, activeTabId, categoryId]);

  useEffect(() => {
    if (!activeTabId && structuredCategories.length > 0 && !sidebarFilters?.category_id) {
      setActiveTabId(structuredCategories[0].id);
    }
  }, [structuredCategories, activeTabId, sidebarFilters, setActiveTabId]);


  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  
  const handleMeta = (meta) => {
    setTotalPages(meta?.last_page || 1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
     <HeadTitle title='الاقسام'/>
    <div className="category-page">
     
      <div className="container">
        <DepartCircle />
        <div className="row-layout row justify-between align-items-start" style={{ margin: '60px 0' }}>
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
                  {showSidebar ? <FaTimes /> : <HiSortDescending />} <span>فرز حسب : مميز</span>
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
              <GridCategory
                parentCategoryId={categoryId}
                sidebarFilters={sidebarFilters}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
                setProductCount={setProductCount}
                currentPage={currentPage} 
                onMetaUpdate={handleMeta}
              />
            ) : (
              <ListCategory
                parentCategoryId={categoryId}
                sidebarFilters={sidebarFilters}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
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

export default CategoryPage;
