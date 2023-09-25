import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useLogin } from "~/features/auth/login";

interface LoginForm {
  username: string;
  password: string;
}

const loginFormSchema = yup
  .object({
    username: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field"),
  })
  .required();

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
    },
  });

  const { mutate: login, isLoading, error } = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = ({ password, username }) => {
    login({ password, username });
  };

  return (
    <Center>
      <Box
        component="form"
        maw={320}
        w="100%"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack>
          {isAxiosError(error) && typeof error.response?.data === "string" && (
            <Alert
              variant="outline"
              color="red"
              title="Failed login attempt"
              icon={<IconExclamationCircle />}
            >
              <Text tt="capitalize" span>
                {error.response.data}
              </Text>
            </Alert>
          )}
          <TextInput
            placeholder="Username"
            {...register("username")}
            disabled={isLoading}
            error={errors.username?.message}
          />
          <PasswordInput
            placeholder="Password"
            {...register("password")}
            disabled={isLoading}
            error={errors.password?.message}
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
