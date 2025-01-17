import { useCallback, useEffect, useState } from "react";
import { getProductsPage } from "../services/axiosService";

export default function useProducts() {
  const [productsPage, setProductsPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsPage(page)
      setProductsPage(prev => ({
        ...data,
        products: page === 1 ? data.products : [...prev.products, ...data.products]
      }));
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const loadMore = () => {
    if (!loading && productsPage?.currentPage < productsPage?.amountOfPages) {
      fetchData(productsPage?.currentPage + 1);
    }
  };

  return { productsPage, loading, error, loadMore };
};
