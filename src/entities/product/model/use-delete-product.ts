import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { api } from "~/shared/api";

export const useDeleteProduct = (productId: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_PRODUCT(productId),
    mutationFn: () => api.product.deleteProduct(productId),
  });
};
