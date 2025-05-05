import { useEffect, useState } from 'react';
import { getCategory } from '../services'; 

const useCategoryStructure = () => {
  const [structuredCategories, setStructuredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const main = await getCategory();
        const structured = await Promise.all(
          main.data.map(async (mainCat) => {
            const sub = await getCategory(mainCat.id); 
            return {
              key: mainCat.id.toString(),
              name: mainCat.name,
              subcategories: sub.data || [],
            };
          })
        );
        setStructuredCategories(structured);
      } catch (error) {
        console.error(" Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { structuredCategories, loading };
};

export default useCategoryStructure;
