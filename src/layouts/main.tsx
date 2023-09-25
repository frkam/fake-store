import { AppShell, Group, Title } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "~/shared/routing";

export const MainLayout = () => {
  return (
    <AppShell padding="md" header={{ height: 58 }} withBorder>
      <AppShell.Header>
        <Group h="100%" mx={16}>
          <NavLink to={routes.main}>
            <Title order={3}>Fake-Store</Title>
          </NavLink>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
