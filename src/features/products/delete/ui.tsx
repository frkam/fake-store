import { Box, Button, LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { cache } from "~/entities/product";
import { useDeleteProduct } from "~/entities/product/model";
import { routes } from "~/shared/routing";

export const DeleteProduct = ({ productId }: { productId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const { mutate, isLoading } = useDeleteProduct(productId);

  const onDeleteClick = () => {
    cache.deleteFromCache(productId);
    mutate();
    navigate(routes.main);
    notifications.show({
      title: "Success",
      message: "The product was successfully removed",
      withCloseButton: true,
      autoClose: 5000,
    });
  };

  return (
    <Box>
      <Button color="red" onClick={open}>
        <IconTrash />
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to remove this product?"
      >
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Button color="red" onClick={onDeleteClick} data-autofocus>
          Delete
        </Button>
      </Modal>
    </Box>
  );
};
