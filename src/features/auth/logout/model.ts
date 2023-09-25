import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useIsAuth } from "~/entities/session";
import { routes } from "~/shared/routing";

export const useLogout = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const { setIsAuth } = useIsAuth();
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    setIsAuth(false);
    navigate(routes.login);
  };

  return logout;
};
