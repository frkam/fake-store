const BASE_KEY = "products";

export const queryKeys = {
  GET_PRODUCT: (id: string) => [BASE_KEY, "get", id],
  UPDATE_PRODUCT: (id: string) => [BASE_KEY, "update", id],
  DELETE_PRODUCT: (id: string) => [BASE_KEY, "delete", id],
  POST_PRODUCT: () => [BASE_KEY, "post"],
  GET_PRODUCTS: () => [BASE_KEY, "all"],
  GET_CATEGORIES: () => [BASE_KEY, "categories"],
};
