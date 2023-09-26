import { useQuery } from "@tanstack/react-query";
import { api } from "~/shared/api";
import { queryKeys } from "./query-keys";

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.GET_PRODUCTS(),
    queryFn: () => api.product.getAllProducts(),
  });
};
