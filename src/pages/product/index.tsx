import {
  Badge,
  Box,
  Button,
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
import { IconEdit } from "@tabler/icons-react";
import { Navigate, useParams } from "react-router-dom";
import { useProduct } from "~/entities/product";
import { DeleteProduct } from "~/features/products/delete";
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
          <Box h={{ base: 320, lg: "100%" }}>
            <Image
              src={data.image}
              alt={data.title}
              fit="contain"
              w={265}
              h="auto"
            />
          </Box>
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
              <Button color="blue">
                <IconEdit />
              </Button>
              <DeleteProduct productId={data.id} />
            </Group>
          </Stack>
        </Flex>
      </Container>
    </Center>
  );
};
