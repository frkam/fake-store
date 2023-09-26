const BASE_KEY = "products";

export const queryKeys = {
  GET_PRODUCT: (id: string) => [BASE_KEY, "get", id.toString()],
  UPDATE_PRODUCT: (id: string) => [BASE_KEY, "update", id.toString()],
  DELETE_PRODUCT: (id: string) => [BASE_KEY, "delete", id.toString()],
  POST_PRODUCT: () => [BASE_KEY, "post"],
  GET_PRODUCTS: () => [BASE_KEY, "all"],
  GET_CATEGORIES: () => [BASE_KEY, "categories"],
};
