import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useIsAuth } from "~/entities/session/model";
import { auth } from "~/shared/api/internal";
import { routes } from "~/shared/routing";

export const useLogin = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const { setIsAuth } = useIsAuth();

  return useMutation<
    { token: string },
    AxiosError,
    { username: string; password: string },
    unknown
  >({
    mutationFn: ({ username, password }) => auth.login({ username, password }),
    onSuccess: (data) => {
      setCookie("token", data.token);
      setIsAuth(true);
      navigate(routes.main);
    },
  });
};
