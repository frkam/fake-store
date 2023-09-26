import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "~/shared/lib/react-query";

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </>
);
