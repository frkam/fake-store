import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </>
);
