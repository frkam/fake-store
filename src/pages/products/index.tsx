import { Box, Center, Loader } from "@mantine/core";
import { ProductList, useProducts } from "~/entities/product";

export const ProductsPage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (isError) return;

  return (
    <Box mt={12}>
      <ProductList products={data} />
    </Box>
  );
};
