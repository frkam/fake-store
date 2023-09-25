import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { MainLayout } = await import("~/layouts/main");
      return { Component: MainLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { ProductsPage } = await import("~/pages/products");
          return { Component: ProductsPage };
        },
      },
      {
        path: "/:productId",
        async lazy() {
          const { ProductPage } = await import("~/pages/product");
          return { Component: ProductPage };
        },
      },
      {
        path: "/login",
        async lazy() {
          const { LoginPage } = await import("~/pages/login");
          return { Component: LoginPage };
        },
      },
    ],
  },
]);

const theme = createTheme({});

export function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
}
