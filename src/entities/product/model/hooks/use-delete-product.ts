import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { api } from "~/shared/api";

export const useDeleteProduct = (productId: string) => {
  const queryClient = useQueryClient();

  // We need to make sure that all products are already loaded, because otherwise the changes will not be reflected on them
  queryClient.ensureQueryData({
    queryKey: queryKeys.GET_PRODUCTS(),
    queryFn: () => api.product.getAllProducts(),
  });

  return useMutation({
    mutationKey: queryKeys.DELETE_PRODUCT(productId),
    mutationFn: () => api.product.deleteProduct(productId),
  });
};
