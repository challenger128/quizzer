import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../hooks/useAuth";
  import { ThemeToggler } from "../Theme/ThemeToggler";
  
  export const Login = () => {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();
  
    const onSubmit = async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        toast({
          title: "Неправильная почта или пароль",
          status: "error",
          isClosable: true,
          duration: 1500,
        });
      }
    };
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          alignItems="center"
          background={useColorModeValue("gray.100", "gray.700")}
          p={12}
          rounded={6}
        >
          <Heading mb={6}>Вход</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <Input
                placeholder="Почта"
                background={useColorModeValue("gray.300", "gray.600")}
                type="email"
                size="lg"
                mt={6}
                {...register("email", {
                  required: "Это поле обязательно",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
                placeholder="Пароль"
                background={useColorModeValue("gray.300", "gray.600")}
                type="password"
                size="lg"
                mt={6}
                {...register("password", {
                  required: "Это поле обязательно",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              loadingText="Вход..."
              width="100%"
              colorScheme="green"
              variant="outline"
              mt={6}
              mb={6}
              type="submit"
              background={useColorModeValue("green.100", "green.800")}
            >
              Войти
            </Button>
          </form>
          <ThemeToggler showLabel={true} size="md"/>
          <Button
            onClick={() => navigate("/register", { replace: true })}
            width="100%"
            colorScheme="gray"
            background={useColorModeValue("gray.300", "gray.600")}
            variant="outline"
            mt={6}
          >
            Регистрация
          </Button>
        </Flex>
      </Flex>
    );
  };
  