import { Anchor, Center, Stack } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { routes } from "~/shared/routing";

export const NotFoundPage = () => {
  return (
    <Center>
      <Stack>
        Page not found
        <Anchor component={NavLink} to={routes.main}>
          Go to main page
        </Anchor>
      </Stack>
    </Center>
  );
};
