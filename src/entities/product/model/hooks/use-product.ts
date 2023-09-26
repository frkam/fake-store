import { useQuery } from "@tanstack/react-query";
import { api } from "~/shared/api";
import { queryKeys } from "../query-keys";

export const useProduct = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: queryKeys.GET_PRODUCT(productId),
    queryFn: () => api.product.getProduct(productId),
    staleTime: Infinity,
  });
};
