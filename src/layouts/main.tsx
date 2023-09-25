import { AppShell, Button, Group, Title } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { useLogout } from "~/features/auth/logout";
import { routes } from "~/shared/routing";

export const MainLayout = () => {
  const logout = useLogout();

  return (
    <AppShell padding="md" header={{ height: 58 }} withBorder>
      <AppShell.Header>
        <Group h="100%" mx={16} justify="space-between">
          <NavLink to={routes.main}>
            <Title order={3}>Fake-Store</Title>
          </NavLink>
          <Button variant="filled" color="gray" onClick={() => logout()}>
            Logout
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
