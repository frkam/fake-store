import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { queryClient } from "~/shared/lib/react-query";

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} /> {children}
    </QueryClientProvider>
  </>
);
