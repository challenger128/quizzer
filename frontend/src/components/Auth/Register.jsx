import { Button, Flex, FormControl, FormErrorMessage, Heading, Input, useColorModeValue, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../Theme/ThemeToggler";
import axiosInstance from "../../services/axios";


export const Register = () => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async (values) => {
        try
        {
            await axiosInstance.post('/users/', values);
            toast({
                title: "Аккаунт успешно создан",
                status: "success",
                isClosable: true,
                duration: 1500,
            });
            navigate("/login", {replace: true});
        }
        catch(error)
        {
            toast({                
                title: "Почта или имя пользователя занято",
                status: "error",
                isClosable: true,
                duration: 1500,
            });
        }
    };

  return (<Flex height="100vh" align="center" justifyContent="center">
        
        <Flex 
        direction="column" alignItems="center" 
        backgroundColor={useColorModeValue("gray.100", "gray.700")} 
        p={12} rounded={6}>
            <Heading mb={6}>Регистрация</Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                <Input 
                    placeholder="Почта"
                    backgroundColor={useColorModeValue("gray.300", "gray.600")} 
                    type="email"
                    size="lg"
                    mt={6}
                    {...register("email",{
                        required: "Это поле обязательно",
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
                <FormControl isInvalid={errors.username}>
                <Input 
                    placeholder="Имя пользователя"
                    backgroundColor={useColorModeValue("gray.300", "gray.600")} 
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("username", {
                        required: "Это поле обязательно",
                        minLength: {
                            value: 4,
                            message: "Имя пользователя должно быть не меньше 4 символов",
                        },
                        maxLength:{
                            value: 30,
                            message: "Имя пользователя должно быть не больше 30 символов"
                        }
                    })}
                />
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
            </FormControl>

                <FormControl isInvalid={errors.password}>

                <Input 
                    placeholder="Пароль"
                    backgroundColor={useColorModeValue("gray.300", "gray.600")} 
                    type="password"
                    size="lg"
                    mt={6}
                    {...register("password", {
                        required: "Это поле обязательно",
                        minLength: {
                            value: 8,
                            message: "Пароль должен быть не меньше 8 символов"
                        },
                        maxLength:{
                            value: 30,
                            message: "Пароль должен быть не больше 30 символов"
                        }
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
                <Button 
                isLoading={isSubmitting} loadingText="Создаем..." width="100%" colorScheme="green" variant="outline" 
                background={useColorModeValue("green.100", "green.800")}
                mt={6} mb={6} type="submit">
                Зарегистрировать
                </Button>
            </form>
                 <ThemeToggler showLabel={true} size="md"/>
                <Button onClick={() => navigate("/login", {replace: true})}
                width="100%"
                colorScheme="gray"
                background={useColorModeValue("gray.300", "gray.600")}
                variant="outline"
                mt={6}
                >
                Войти
                </Button>
        </Flex>
    </Flex>
  );
};

