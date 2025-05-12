import {
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import toast from "../../../libs/toast";
import { routesMap } from "../../../routes/routes";
import { useLogin } from "../../../services/auth/login";
import { login } from "../../../store/features/user/userSlice";
import { IResponse } from "../../../types/interface";
import { UserResponseType } from "../../../types/user";
import MainTemPlate from "../../templates/MainTemPlate";
import { getAxiosError } from "../../../libs/axios";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const dispatch = useAppDispatch();

    const loginMution = useLogin({
        mutationConfig: {
            onSuccess(data: IResponse<UserResponseType>) {
                dispatch(login(data.data));
                toast({
                    status: "success",
                    title: "Tạo tài khoản thành công",
                });
                setIsLoading(false);
                navigate(routesMap.Home);
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValid = validateEmail(email);
        const passwordValid = password.length >= 4;

        setIsEmailError(!emailValid);
        setIsPasswordError(!passwordValid);

        if (emailValid && passwordValid) {
            setIsLoading(true);
            loginMution.mutate({ email: email, password: password });
        }
    };

    return (
        <MainTemPlate>
            <HStack
                justifyContent="center"
                alignItems="start"
                w="100%"
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Box maxH="80vh" w={500}>
                    <Container
                        maxW="lg"
                        py={{ base: 12, md: 24 }}
                        px={{ base: 4, sm: 8 }}
                    >
                        <Stack spacing={8}>
                            <Stack spacing={6} textAlign="center">
                                <Heading
                                    fontSize={{ base: "2xl", md: "3xl" }}
                                    color={useColorModeValue(
                                        "blue.600",
                                        "blue.400"
                                    )}
                                >
                                    Chào mừng trở lại
                                </Heading>
                                <Text
                                    color={useColorModeValue(
                                        "gray.600",
                                        "gray.400"
                                    )}
                                    fontSize={{ base: "sm", sm: "md" }}
                                >
                                    Đăng nhập để tiếp tục sử dụng ứng dụng
                                </Text>
                            </Stack>

                            <Box
                                py={{ base: 8, sm: 10 }}
                                px={{ base: 4, sm: 10 }}
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow="lg"
                                borderRadius="xl"
                            >
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <Stack spacing={4}>
                                        <FormControl
                                            id="email"
                                            isRequired
                                            isInvalid={isEmailError}
                                        >
                                            <FormLabel fontSize="sm">
                                                Địa chỉ email
                                            </FormLabel>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="your@email.com"
                                                size="md"
                                                borderRadius="md"
                                            />
                                            {isEmailError && (
                                                <FormErrorMessage>
                                                    Email không hợp lệ
                                                </FormErrorMessage>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            id="password"
                                            isRequired
                                            isInvalid={isPasswordError}
                                        >
                                            <FormLabel fontSize="sm">
                                                Mật khẩu
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="••••••••"
                                                    size="md"
                                                    borderRadius="md"
                                                />
                                                <InputRightElement h="full">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={
                                                            handlePasswordVisibility
                                                        }
                                                        aria-label={
                                                            showPassword
                                                                ? "Hide password"
                                                                : "Show password"
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <Icon
                                                                as={FiEyeOff}
                                                            />
                                                        ) : (
                                                            <Icon as={FiEye} />
                                                        )}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {isPasswordError && (
                                                <FormErrorMessage>
                                                    Mật khẩu phải có ít nhất 6
                                                    ký tự
                                                </FormErrorMessage>
                                            )}
                                        </FormControl>

                                        <HStack justify="space-between">
                                            <Checkbox
                                                colorScheme="blue"
                                                defaultChecked
                                            >
                                                <Text fontSize="sm">
                                                    Ghi nhớ đăng nhập
                                                </Text>
                                            </Checkbox>
                                            <Button
                                                variant="link"
                                                colorScheme="blue"
                                                size="sm"
                                            >
                                                Quên mật khẩu?
                                            </Button>
                                        </HStack>

                                        <Button
                                            bg="blue.500"
                                            color="white"
                                            _hover={{
                                                bg: "blue.600",
                                            }}
                                            type="submit"
                                            isLoading={isLoading}
                                            loadingText="Đang xử lý..."
                                            size="lg"
                                            fontSize="md"
                                            borderRadius="md"
                                            mt={2}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>

                            <Flex
                                justify="center"
                                align="center"
                                direction={{ base: "column", sm: "row" }}
                                mt={2}
                                fontSize="sm"
                            >
                                <Text color="gray.500" mr={1}>
                                    Chưa có tài khoản?
                                </Text>
                                <Button
                                    variant="link"
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => navigate(routesMap.Regsiter)}
                                >
                                    Đăng ký ngay
                                </Button>
                            </Flex>
                        </Stack>
                    </Container>
                </Box>
            </HStack>
        </MainTemPlate>
    );
};

export default Login;
