import { useState } from "react";

const useFilterState = () => {
  const [pendingFilters, setPendingFilters] = useState({
    sortOrder: "",
    searchQuery: "",
    selectedSubcategories: [],
    expanded: null,
  });

  const [appliedFilters, setAppliedFilters] = useState(null);

  const toggleSection = (key) => {
    setPendingFilters((prev) => ({
      ...prev,
      expanded: prev.expanded === key ? null : key,
    }));
  };

  const toggleSubcategory = (subId) => {
    setPendingFilters((prev) => {
      const selected = prev.selectedSubcategories.includes(subId)
        ? prev.selectedSubcategories.filter((id) => id !== subId)
        : [...prev.selectedSubcategories, subId];
      return { ...prev, selectedSubcategories: selected };
    });
  };

  const applyFilters = () => {
    const hasFilters =
      pendingFilters.sortOrder ||
      pendingFilters.searchQuery ||
      pendingFilters.selectedSubcategories.length > 0;

    if (!hasFilters) {
      setAppliedFilters(null);
    } else {
      setAppliedFilters({
        sort_by: pendingFilters.sortOrder ? "price" : undefined,
        sort_order: pendingFilters.sortOrder || undefined,
        search: pendingFilters.searchQuery || undefined,
        category_id:
          pendingFilters.selectedSubcategories.length > 0
            ? pendingFilters.selectedSubcategories
            : undefined,
      });
    }
  };

  const resetFilters = () => {
    setPendingFilters({
      sortOrder: "",
      searchQuery: "",
      selectedSubcategories: [],
      expanded: null,
    });
    setAppliedFilters(null);
  };
  return {
    pendingFilters,
    setPendingFilters,
    appliedFilters,
    applyFilters,
    toggleSection,
    toggleSubcategory,
    resetFilters,
  };
};
export default useFilterState;
