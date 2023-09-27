import { MantineProvider, QueryProvider, RouterProvider } from "./providers";

export function App() {
  return (
    <MantineProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </MantineProvider>
  );
}
