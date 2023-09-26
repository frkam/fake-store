import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Center, Stack, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput, TextInput } from "react-hook-form-mantine";
import * as yup from "yup";
import { useLogin } from "~/features/auth/login";

const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type LoginForm = yup.InferType<typeof loginSchema>;

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
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
        noValidate
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
            label="Username"
            name="username"
            control={control}
            required
            disabled={isLoading}
            error={errors.username?.message}
          />
          <PasswordInput
            label="Password"
            name="password"
            control={control}
            required
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
