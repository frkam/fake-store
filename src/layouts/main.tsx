import { AppShell, Burger, Button, Group, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, Outlet } from "react-router-dom";
import { useIsAuth } from "~/entities/session";
import { useLogout } from "~/features/auth/logout";
import { AddProduct } from "~/features/products/add";
import { routes } from "~/shared/routing";

export const MainLayout = () => {
  const { isAuth } = useIsAuth();
  const [opened, { toggle }] = useDisclosure();

  const logout = useLogout();

  return (
    <AppShell
      header={{ height: 58 }}
      padding="lg"
      withBorder
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" mx="lg" justify="space-between">
          <NavLink to={routes.main}>
            <Title order={3}>Fake-store</Title>
          </NavLink>
          <Group visibleFrom="sm">
            {isAuth && (
              <>
                <AddProduct />
                <Button variant="filled" color="red" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            )}
          </Group>
          {isAuth && (
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          )}
        </Group>
      </AppShell.Header>
      {isAuth && (
        <AppShell.Navbar py="md" hiddenFrom="sm" px={4}>
          {isAuth && (
            <Stack mx="md">
              <AddProduct />
              <Button variant="filled" color="red" onClick={() => logout()}>
                Logout
              </Button>
            </Stack>
          )}
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
