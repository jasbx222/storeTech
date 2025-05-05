// components/Filter/FilterSidebar.jsx
import React from 'react';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import '../Categories/Categories.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const FilterSidebar = ({
  pendingFilters,
  setPendingFilters,
  applyFilters,
  categories,
  toggleSection,
  toggleSubcategory,
  resetFilters
  
}) => {
  console.log(pendingFilters.selectedSubcategories);

  return (
    <div className="filter-sidebar">
      <h3>فرز حسب السعر</h3>
      <div className="sort-by-price">
     

<FormControl fullWidth variant="outlined" size="small">
  <Select
    value={pendingFilters.sortOrder}
    onChange={(e) =>
      setPendingFilters((prev) => ({
        ...prev,
        sortOrder: e.target.value
      }))
    }
    displayEmpty
    renderValue={(selected) => {
      if (!selected) {
        return "ترتيب";
      }
      return selected === "asc" ? "من الأرخص إلى الأغلى" : "من الأغلى إلى الأرخص";
    }}
  >
    <MenuItem value="">اختر</MenuItem>
    <MenuItem value="asc">من الأرخص إلى الأغلى</MenuItem>
    <MenuItem value="desc">من الأغلى إلى الأرخص</MenuItem>
  </Select>
</FormControl>

</div>

      <div className="filter-search-name">
        <input
          type="text"
          className='sidbar-filter-name'
          value={pendingFilters.searchQuery}
          onChange={(e) =>
            setPendingFilters((prev) => ({
              ...prev,
              searchQuery: e.target.value
            }))
          }
          placeholder="ابحث عن منتج ..."
        />
      </div>

      <h4>الأقسام</h4>
      <div className="category">
        {categories.map((category) => (
          <div key={category.key}>
            <div
              className="category-header"
              onClick={() => toggleSection(category.key)}
            >
              {pendingFilters.expanded === category.key ? <FaChevronDown /> : <FaChevronLeft />}
              <span>{category.name}</span>
            </div>
            {pendingFilters.expanded === category.key && (
              <div className="subcategory">
                {category.subcategories.map((sub) => (
                  <label key={sub.id}>
                    <input
  type="checkbox"
  checked={pendingFilters.selectedSubcategories.includes(sub.id)}
  onChange={() => toggleSubcategory(sub.id)}
/>

                    {sub.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="apply-button">
        <button className="apply-filters-btn" onClick={applyFilters}>
          تطبيق الفلتر
        </button>
        <div className="reset-button">
  <button className="reset-filters-btn" onClick={resetFilters}>
 إلغاء
  </button>
</div>
      </div>
    </div>
  );
};

export default FilterSidebar;
