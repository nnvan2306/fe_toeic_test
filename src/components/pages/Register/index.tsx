import {
    Box,
    Button,
    Flex,
    FormControl,
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
import { useRegister } from "../../../services/auth/register";
import { login } from "../../../store/features/user/userSlice";
import { IResponse } from "../../../types/interface";
import { UserResponseType } from "../../../types/user";
import MainTemPlate from "../../templates/MainTemPlate";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);
    const dispatch = useAppDispatch();

    const register = useRegister({
        mutationConfig: {
            onSuccess(data: IResponse<UserResponseType>) {
                dispatch(login(data.data));
                toast({
                    status: "success",
                    title: "Tạo tài khoản thành công",
                });
                setFullName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate(routesMap.Home);
            },
            onError() { },
        },
    });
    const handleValidate = () => {
        if (!fullName || !email || !password || password !== confirmPassword) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }

        register.mutate({
            username: fullName,
            email: email,
            password: password,
        });
    };

    return (
        <MainTemPlate>
            <HStack
                h={"100%"}
                w={"100%"}
                justifyContent="center"
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Box minH="90vh" w={500} px={{ base: 4, md: 10 }}>
                    <Box w="100%" pt={{ base: 4, md: 4 }} pb={6}>
                        <Stack spacing={8} w="100%">
                            <Stack spacing={2}>
                                <Heading
                                    textAlign="center"
                                    fontSize="2xl"
                                    fontWeight="600"
                                    color={useColorModeValue(
                                        "blue.600",
                                        "blue.400"
                                    )}
                                >
                                    Tạo tài khoản mới
                                </Heading>
                                <Text
                                    textAlign="center"
                                    color={useColorModeValue(
                                        "gray.600",
                                        "gray.400"
                                    )}
                                    fontSize="sm"
                                >
                                    Đăng ký để bắt đầu sử dụng ứng dụng
                                </Text>
                            </Stack>

                            <Box
                                w="100%"
                                py={{ base: 8, sm: 10 }}
                                px={{ base: 4, sm: 10 }}
                                bg={useColorModeValue("white", "gray.700")}
                                boxShadow="lg"
                                borderRadius="xl"
                            >
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={4}>
                                        <FormControl id="fullName" isRequired>
                                            <FormLabel fontSize="sm">
                                                Họ và tên
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                                placeholder="Nguyễn Văn A"
                                                size="md"
                                                borderRadius="md"
                                                bg="white"
                                                borderColor="gray.300"
                                            />
                                        </FormControl>

                                        <FormControl id="email" isRequired>
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
                                                bg="white"
                                                borderColor="gray.300"
                                            />
                                        </FormControl>

                                        <FormControl id="password" isRequired>
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
                                                    bg="white"
                                                    borderColor="gray.300"
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
                                        </FormControl>

                                        <FormControl
                                            id="confirmPassword"
                                            isRequired
                                        >
                                            <FormLabel fontSize="sm">
                                                Xác nhận mật khẩu
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="••••••••"
                                                    size="md"
                                                    borderRadius="md"
                                                    bg="white"
                                                    borderColor="gray.300"
                                                />
                                                <InputRightElement h="full">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={
                                                            handleConfirmPasswordVisibility
                                                        }
                                                        aria-label={
                                                            showConfirmPassword
                                                                ? "Hide password"
                                                                : "Show password"
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <Icon
                                                                as={FiEyeOff}
                                                            />
                                                        ) : (
                                                            <Icon as={FiEye} />
                                                        )}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>

                                        <Button
                                            bg="blue.500"
                                            color="white"
                                            _hover={{
                                                bg: "blue.600",
                                            }}
                                            type="submit"
                                            size="md"
                                            fontSize="md"
                                            borderRadius="md"
                                            mt={2}
                                            width="100%"
                                        >
                                            Đăng ký
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>

                            <Flex justify="center" align="center" fontSize="sm">
                                <Text color="gray.500" mr={1}>
                                    Đã có tài khoản?
                                </Text>
                                <Text
                                    color="blue.500"
                                    cursor="pointer"
                                    onClick={() => navigate(routesMap.Login)}
                                >
                                    Đăng nhập ngay
                                </Text>
                            </Flex>
                        </Stack>
                    </Box>
                </Box>
            </HStack>
        </MainTemPlate>
    );
};

export default Register;
