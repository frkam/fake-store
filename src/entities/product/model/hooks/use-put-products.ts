import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, api } from "~/shared/api";
import { queryKeys } from "../query-keys";

export const usePutProduct = (productId: string) => {
  const queryClient = useQueryClient();

  // We need to make sure that all products are already loaded, because otherwise the changes will not be reflected on them
  queryClient.prefetchQuery({
    queryKey: queryKeys.GET_PRODUCTS(),
    queryFn: () => api.product.getAllProducts(),
  });

  return useMutation({
    mutationKey: queryKeys.UPDATE_PRODUCT(productId),
    mutationFn: (product: Product) =>
      api.product.putProduct(productId, product),
  });
};
