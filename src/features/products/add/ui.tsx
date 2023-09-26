import { Box, Button, LoadingOverlay, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLink } from "@tabler/icons-react";
import { cache, useCategories, usePostProduct } from "~/entities/product";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "react-hook-form-mantine";
import { useNavigate } from "react-router-dom";
import { routes } from "~/shared/routing";

const addProductSchema = yup
  .object({
    title: yup.string().required().min(2).max(30),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .required()
      .positive(),
    description: yup.string().required().min(10).max(1000),
    image: yup.string().required().url(),
    category: yup.string().required(),
  })
  .required();

type AddProductForm = yup.InferType<typeof addProductSchema>;

export const AddProduct = () => {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { mutate, isLoading } = usePostProduct();

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<AddProductForm>({
    resolver: yupResolver(addProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      category: undefined,
      description: "",
      image: "https://placehold.co/600x400/EEE/31343C",
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit: SubmitHandler<AddProductForm> = (data) => {
    mutate(data, {
      onSuccess: (product) => {
        const id = Date.now().toString();
        product.id = id;
        cache.addToCache(id, product);
        navigate(routes.product(product.id));
        close();
      },
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack>
            <TextInput
              label="Title"
              name="title"
              required
              control={control}
              data-autofocus
            />
            <NumberInput
              label="Price"
              description="Price in USD"
              allowNegative={false}
              required
              name="price"
              control={control}
            />
            <Textarea
              label="Description"
              required
              name="description"
              control={control}
            />
            <TextInput
              label="Image"
              rightSection={<IconLink />}
              required
              name="image"
              control={control}
            />
            <Select
              label="Category"
              disabled={isCategoriesLoading}
              name="category"
              control={control}
              data={categories}
              required
            />
            <Button type="submit" color="blue">
              Add product
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
};
