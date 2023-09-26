import { Product } from "~/shared/api";
import { queryClient } from "~/shared/lib/react-query";
import { queryKeys } from "./query-keys";

export const addToCache = (productId: string, newProduct: Product) => {
  queryClient.setQueryData(
    queryKeys.GET_PRODUCTS(),
    (products: Product[] | undefined): Product[] | undefined => {
      if (!products) {
        return;
      }

      return [...products, newProduct];
    }
  );

  queryClient.setQueryData(queryKeys.GET_PRODUCT(productId), newProduct);
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

export const updateInCache = (newProduct: Product) => {
  queryClient.setQueryData(
    queryKeys.GET_PRODUCTS(),
    (products: Product[] | undefined): Product[] | undefined => {
      if (!products) {
        return;
      }

      return products?.map((product) =>
        product.id === newProduct.id ? newProduct : product
      );
    }
  );

  queryClient.setQueryData(queryKeys.GET_PRODUCT(newProduct.id), newProduct);
};
