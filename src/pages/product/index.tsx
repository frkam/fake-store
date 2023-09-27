import {
  Badge,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Navigate, useParams } from "react-router-dom";
import { useProduct } from "~/entities/product";
import { DeleteProduct } from "~/features/products/delete";
import { EditProduct } from "~/features/products/edit";
import { routes } from "~/shared/routing";

type Params = {
  productId: string;
};

export const ProductPage = () => {
  const { productId } = useParams() as Params;

  const { data, isLoading, isError } = useProduct({
    productId,
  });

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (isError || !data) return <Navigate to={routes.notFound} replace />;

  return (
    <Center>
      <Container>
        <Flex gap={32} direction={{ base: "column", lg: "row" }}>
          <Center>
            <Image
              src={data.image}
              alt={data.title}
              fit="contain"
              w={265}
              h="auto"
            />
          </Center>
          <Stack>
            <Badge>{data.category}</Badge>
            <Title order={3}>{data.title}</Title>
            <Text>{data.description}</Text>
            <Badge p={12}>
              <Text size="xl" span>
                {data.price}$
              </Text>
            </Badge>
            <Group>
              <EditProduct productId={data.id} product={data} />
              <DeleteProduct productId={data.id} />
            </Group>
          </Stack>
        </Flex>
      </Container>
    </Center>
  );
};
