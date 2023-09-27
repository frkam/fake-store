import { Box, Button, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cache } from "~/entities/product";
import { useForm } from "react-hook-form";
import { ProductForm, productSchema } from "../shared/product-form";
import { IconEdit } from "@tabler/icons-react";
import { usePutProduct } from "~/entities/product";
import { Product } from "~/shared/api";
import { notifications } from "@mantine/notifications";
import { yupResolver } from "@hookform/resolvers/yup";
export const EditProduct = ({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}) => {
  const { mutate, isLoading } = usePutProduct(productId);
  const { handleSubmit, control, formState, reset } = useForm<ProductForm>({
    defaultValues: product,
    resolver: yupResolver(productSchema),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = handleSubmit((data) => {
    if (formState.isDirty) {
      mutate(
        { id: productId, ...data },
        {
          onSuccess: (newProduct) => {
            cache.updateInCache(newProduct);
            notifications.show({
              title: "Success",
              message: "The product has been successfully edited",
              withCloseButton: true,
              autoClose: 5000,
            });
            reset({}, { keepValues: true });
            close();
          },
        }
      );
    }
  });

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
          control={control}
          isLoading={isLoading}
          onSubmit={onSubmit}
          disabled={!formState.isDirty}
          submitText="Edit product"
        />
      </Modal>
    </Box>
  );
};
