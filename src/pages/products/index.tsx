import { Box, Center, Loader } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { ProductList, useProducts } from "~/entities/product";
import { routes } from "~/shared/routing";

export const ProductsPage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  // TODO: Better handle this error
  if (isError) return <Navigate to={routes.notFound} replace />;

  return (
    <Box mt={12}>
      <ProductList products={data} />
    </Box>
  );
};
