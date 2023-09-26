import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, api } from "~/shared/api";
import { queryKeys } from "../query-keys";

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  // We need to make sure that all products are already loaded, because otherwise the changes will not be reflected on them
  queryClient.ensureQueryData({
    queryKey: queryKeys.GET_PRODUCTS(),
    queryFn: () => api.product.getAllProducts(),
  });

  return useMutation({
    mutationKey: queryKeys.POST_PRODUCT(),
    mutationFn: (product: Omit<Product, "id">) =>
      api.product.postProduct(product),
  });
};
