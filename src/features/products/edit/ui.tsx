import { Box, Button, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cache } from "~/entities/product";
import { SubmitHandler } from "react-hook-form";
import { ProductForm } from "../shared/product-form";
import { IconEdit } from "@tabler/icons-react";
import { usePutProduct } from "~/entities/product/model/hooks/use-put-products";
import { Product } from "~/shared/api";
import { notifications } from "@mantine/notifications";

export const EditProduct = ({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}) => {
  const { mutate, isLoading } = usePutProduct(productId);

  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    mutate(
      { id: productId, ...data },
      {
        onSuccess: (newProduct) => {
          console.log(newProduct);
          cache.updateInCache(newProduct);
          notifications.show({
            title: "Success",
            message: "The product has been successfully edited",
          });
          close();
        },
      }
    );
  };

  return (
    <Box>
      <Button color="blue" onClick={open}>
        <IconEdit />
      </Button>
      <Modal opened={opened} onClose={close} title="Edit product">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <ProductForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          submitText="Edit product"
          defaultValues={product}
        />
      </Modal>
    </Box>
  );
};
