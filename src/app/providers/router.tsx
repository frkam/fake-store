import {
  RouterProvider as ExternalRouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AnonymousRoute, AuthorizedRoute } from "~/entities/session";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { MainLayout } = await import("~/layouts/main");
      return { Component: MainLayout };
    },
    children: [
      {
        element: <AuthorizedRoute />,
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
        ],
      },
      {
        element: <AnonymousRoute />,
        children: [
          {
            path: "/login",
            async lazy() {
              const { LoginPage } = await import("~/pages/login");
              return { Component: LoginPage };
            },
          },
        ],
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <ExternalRouterProvider router={router} />;
};
