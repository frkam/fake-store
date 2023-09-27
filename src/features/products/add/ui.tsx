import { Box, Button, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cache, usePostProduct } from "~/entities/product";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "~/shared/routing";
import { ProductForm, productSchema } from "../shared/product-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const AddProduct = () => {
  const { mutate, isLoading } = usePostProduct();
  const { handleSubmit, control } = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (product) => {
        const id = Date.now().toString();
        product.id = id;
        cache.addToCache(id, product);
        navigate(routes.product(product.id));
        close();
      },
    });
  });

  return (
    <Box>
      <Button color="blue" onClick={open} w="100%">
        Add product
      </Button>
      <Modal opened={opened} onClose={close} title="Add product">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <ProductForm
          control={control}
          isLoading={isLoading}
          onSubmit={onSubmit}
          submitText="Add product"
        />
      </Modal>
    </Box>
  );
};
