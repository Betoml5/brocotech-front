import { getProductsAPI } from "@/api/Product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);

  const { data, isLoading, error, status, isError } = useQuery({
    queryKey: "products",
    queryFn: getProductsAPI,
    onSuccess: (data) => setProducts(data),
  });

  return {
    products,
  };
};

export default useProduct;
