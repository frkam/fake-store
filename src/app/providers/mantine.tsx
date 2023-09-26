import { ReactNode } from "react";
import {
  MantineProvider as ExternalMantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ExternalMantineProvider theme={theme}>
      <Notifications />
      {children}
    </ExternalMantineProvider>
  );
};
