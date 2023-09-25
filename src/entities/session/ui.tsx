import { Navigate, Outlet } from "react-router-dom";
import { routes } from "~/shared/routing";
import { useIsAuth } from "./model";

export const AuthorizedRoute = () => {
  const { isAuth } = useIsAuth();

  return isAuth ? <Outlet /> : <Navigate to={routes.login} replace />;
};

export const AnonymousRoute = () => {
  const { isAuth } = useIsAuth();

  return isAuth ? <Navigate to={routes.main} replace /> : <Outlet />;
};
