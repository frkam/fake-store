import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Group,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavLink, Outlet } from "react-router-dom";
import { useIsAuth } from "~/entities/session";
import { useLogout } from "~/features/auth/logout";
import { AddProduct } from "~/features/products/add";
import { routes } from "~/shared/routing";

export const MainLayout = () => {
  const [cookies] = useCookies(["token"]);
  const { setIsAuth, isAuth } = useIsAuth();
  const logout = useLogout();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    if (isAuth === null) {
      if (cookies.token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
  }, [cookies.token, setIsAuth, isAuth]);

  if (isAuth === null)
    return (
      <Box h="100vh" w="100vw">
        <Center h="100%">
          <Loader />
        </Center>
      </Box>
    );

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
