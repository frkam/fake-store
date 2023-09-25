import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useIsAuth } from "~/entities/session";
import { MantineProvider, QueryProvider, RouterProvider } from "./providers";

export function App() {
  const [cookies] = useCookies(["token"]);
  const { setIsAuth } = useIsAuth();

  useEffect(() => {
    if (cookies.token) {
      setIsAuth(true);
    }
  }, [cookies.token, setIsAuth]);

  return (
    <MantineProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </MantineProvider>
  );
}
