import { Product } from "~/shared/api";
import { queryClient } from "~/shared/lib/react-query";
import { queryKeys } from "./query-keys";

export const addToCache = (productId: string, product: Product) => {
  queryClient.setQueryData(
    queryKeys.GET_PRODUCTS(),
    (products: Product[] | undefined): Product[] | undefined => {
      return products ? [...products, product] : [product];
    }
  );

  queryClient.setQueryData(queryKeys.GET_PRODUCT(productId), product);
};

export const deleteFromCache = (productId: string) => {
  queryClient.setQueryData(
    queryKeys.GET_PRODUCTS(),
    (products: Product[] | undefined): Product[] | undefined => {
      return products?.filter((product) => product.id !== productId);
    }
  );

  queryClient.removeQueries(queryKeys.GET_PRODUCT(productId));
};
