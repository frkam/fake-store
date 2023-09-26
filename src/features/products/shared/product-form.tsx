import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Loader, Stack } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "react-hook-form-mantine";
import * as yup from "yup";
import { useCategories } from "~/entities/product";

const productSchema = yup
  .object({
    title: yup.string().required().min(2).max(120),
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

export type ProductForm = yup.InferType<typeof productSchema>;

type ProductFormProps = {
  isLoading: boolean;
  onSubmit: (data: ProductForm) => void;
  defaultValues: {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    category?: string;
  };
  submitText: string;
};

export const ProductForm = ({
  isLoading,
  onSubmit,
  defaultValues,
  submitText,
}: ProductFormProps) => {
  const { handleSubmit, control } = useForm<ProductForm>({
    defaultValues,
    resolver: yupResolver(productSchema),
  });

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  return (
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
        {!isCategoriesLoading ? (
          <Select
            label="Category"
            disabled={isCategoriesLoading}
            name="category"
            control={control}
            data={categories}
            required
          />
        ) : (
          <Loader />
        )}
        <Button type="submit" color="blue" loading={isLoading}>
          {submitText}
        </Button>
      </Stack>
    </form>
  );
};
