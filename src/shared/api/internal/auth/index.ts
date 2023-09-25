import { internalApi } from "~/shared/api/internal/base";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await internalApi.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};

export { login };
