import { Grid } from "@mantine/core";
import { Product } from "~/shared/api";
import { ProductCard } from "./product-card";

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <Grid>
      {products.map((product) => {
        return (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={product.id}>
            <ProductCard
              id={product.id}
              image={product.image}
              price={product.price}
              title={product.title}
              key={product.id}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
