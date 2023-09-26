import { useQuery } from "@tanstack/react-query";
import { api } from "~/shared/api";
import { queryKeys } from "../query-keys";

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.GET_CATEGORIES(),
    queryFn: () => api.product.getAllCategories(),
  });
};
