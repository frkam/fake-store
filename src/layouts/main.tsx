import { AppShell, Button, Group, Title } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { useIsAuth } from "~/entities/session";
import { useLogout } from "~/features/auth/logout";
import { AddProduct } from "~/features/products/add";
import { routes } from "~/shared/routing";

export const MainLayout = () => {
  const { isAuth } = useIsAuth();

  const logout = useLogout();

  return (
    <AppShell header={{ height: 58 }} padding="lg" withBorder>
      <AppShell.Header>
        <Group h="100%" mx="lg" justify="space-between">
          <Group>
            <NavLink to={routes.main}>
              <Title order={3}>Fake-Store</Title>
            </NavLink>
            {isAuth && <AddProduct />}
          </Group>
          {isAuth && (
            <Button variant="filled" color="red" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
