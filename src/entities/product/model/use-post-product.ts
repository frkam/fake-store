import { useMutation } from "@tanstack/react-query";
import { Product, api } from "~/shared/api";
import { queryKeys } from "./query-keys";

export const usePostProduct = () => {
  return useMutation({
    mutationKey: queryKeys.POST_PRODUCT(),
    mutationFn: (product: Omit<Product, "id">) =>
      api.product.postProduct(product),
  });
};
