import { useCallback, useEffect, useState } from "react";
import { getCategoryByID } from "../services/axiosService";

export function useCategoryId(categoryId) {
  const [productsPage, setProductsPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoryByID(categoryId, page)
      setProductsPage(prev => ({
        ...data,
        products: page === 1 ? data.products : [...prev.products, ...data.products]
      }));
    } catch (err) {
      setError('Error al cargar los datos: ', err.message);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchData(1);
  }, []);

  const loadMore = () => {
    if (!loading && productsPage.currentPage < productsPage.amountOfPages) {
      fetchData(productsPage.currentPage + 1);
    }
  };

  return { productsPage, loading, error, loadMore };
};
