import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Title,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Product } from "~/shared/api";
import { routes } from "~/shared/routing";

type ProductCardProps = Omit<Product, "description" | "category">;

export const ProductCard = ({ title, image, id, price }: ProductCardProps) => {
  return (
    <Card withBorder shadow="sm" padding="lg" radius="md" h="100%">
      <Card.Section p={20}>
        <NavLink
          to={routes.product(id.toString())}
          style={{ textDecoration: "none" }}
        >
          <Image h={200} fit="contain" src={image} alt={title} />
        </NavLink>
        <Divider mt={12} />
      </Card.Section>
      <Group justify="space-between" mt={8}>
        <Badge color="blue">{price}$</Badge>
      </Group>
      <Stack gap="sm" mt={8} mb={12}>
        <Title order={6}>{title}</Title>
      </Stack>
      <Button component={NavLink} mt="auto" to={routes.product(id.toString())}>
        Open product
      </Button>
    </Card>
  );
};
