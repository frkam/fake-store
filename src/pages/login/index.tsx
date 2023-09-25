import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

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
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
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
          {errors.root?.message}
          <TextInput
            placeholder="Username"
            {...register("username")}
            error={errors.username?.message}
          />
          <PasswordInput
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </Box>
    </Center>
  );
};
