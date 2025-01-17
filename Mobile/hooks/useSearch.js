import { useCallback, useEffect, useState } from "react";
import { searchProducts } from "../services/axiosService";
import { Keyboard } from "react-native";

export default function useSearch() {
  const [productsPage, setProductsPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState(null);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    Keyboard.dismiss();
    setError(null);
    try {
      const data = await searchProducts(searchText, page)
      setProductsPage(prev => ({
        ...data,
        products: page === 1 ? data.products : [...prev.products, ...data.products]
      }));
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  },[searchText]);

  useEffect(() => {
    searchText ? fetchData() : null;
  }, [searchText]);

  const loadMore = () => {
    if (!loading && productsPage.currentPage < productsPage.amountOfPages) {
      fetchData(productsPage.currentPage + 1);
    }
  };

  return { setSearchText, productsPage, loading, error, loadMore };
};
