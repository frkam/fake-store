import { api } from "~/shared/api/base";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await api.post<{ token: string }>("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export { login };
