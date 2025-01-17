import { useCallback, useEffect, useState } from "react";
import { getRelated } from "../services/axiosService";

export default function useRelatedProducts(productId) {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRelated(productId);
      setRelatedProducts(data.products);
    } catch (err) {
      setError(`Error al cargar los datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  },[productId]); 

  useEffect(() => {
    fetchData();
  }, [productId]); 

  return { relatedProducts, loading, error };
}
