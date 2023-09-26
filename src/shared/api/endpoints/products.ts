import { Product } from "~/shared/api/types";
import { api } from "../base";

const getAllProducts = async () => {
  const response = await api.get<Product[]>("/products");

  return response.data;
};

const getAllCategories = async () => {
  const response = await api.get<string[]>("/products/categories");

  return response.data;
};

const getProduct = async (productId: string) => {
  const response = await api.get<Product>(`/products/${productId}`);

  return response.data;
};

const postProduct = async (product: Omit<Product, "id">) => {
  const response = await api.post<Product>("/products", {
    ...product,
  });

  return response.data;
};

const deleteProduct = async (productId: string) => {
  const response = await api.delete<Product>(`/products/${productId}`);

  return response.data;
};

export {
  getAllProducts,
  getProduct,
  postProduct,
  getAllCategories,
  deleteProduct,
};
