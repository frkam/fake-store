import { ReactNode } from "react";
import {
  MantineProvider as ExternalMantineProvider,
  createTheme,
} from "@mantine/core";

const theme = createTheme({});

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ExternalMantineProvider theme={theme}>{children}</ExternalMantineProvider>
  );
};
