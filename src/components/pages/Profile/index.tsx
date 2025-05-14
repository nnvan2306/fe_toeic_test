import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Text,
    useColorModeValue,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiMail, FiPhone, FiSave, FiUser, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import api from "../../../libs/axios";
import { setUserSlice } from "../../../store/features/user/userSlice";
import { UserResponseType } from "../../../types/user";
import MainTemPlate from "../../templates/MainTemPlate";

const Profile = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { t } = useTranslation()

    const setUser = (user: UserResponseType) => {
        dispatch(setUserSlice(user));
    }

    const [editMode, setEditMode] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const toast = useToast();

    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const avatarBg = useColorModeValue("gray.50", "gray.800");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (user) {
            setUser({
                ...user,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        if (!user) return;

        const newErrors: Record<string, string> = {};

        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!user.phone || !/^\+?[0-9]{10,15}$/.test(user.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!user.name) {
            newErrors.name = "Tên không được để trống";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (validateForm()) {
            try {
                await api.put("/user", {
                    ...user,
                    id: user?.id,
                })

                toast({
                    title: "Lưu thành công",
                    description: "Thông tin cá nhân đã được cập nhật",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setEditMode(false);
            } catch (error) {
                console.log(error)
                toast({
                    title: "Có lỗi xảy ra"
                })
            }
        }



    };

    const handleCancel = () => {
        if (!user) return;
        setUser(user);
        setErrors({});
        setEditMode(false);
    };

    return (
        <MainTemPlate>
            {user ? <Container maxW="container.md" py={8}>
                <Flex direction="column" align="center">
                    <Heading size="xl" mb={8}>
                        {t("profile.title")}
                    </Heading>

                    <Flex
                        direction={{ base: "column", md: "row" }}
                        w="full"
                        bg={cardBg}
                        borderRadius="lg"
                        overflow="hidden"
                        borderWidth="1px"
                        borderColor={borderColor}
                        boxShadow="lg"
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            p={8}
                            bg={avatarBg}
                            w={{ base: "full", md: "40%" }}
                        >
                            <Box position="relative" mb={4}>
                                <Avatar
                                    size="2xl"
                                    name={user.name}
                                    src={user.image}
                                    mb={2}
                                />
                                {/* {editMode && (
                                    <IconButton
                                        aria-label="Change avatar"
                                        icon={<FiEdit />}
                                        size="sm"
                                        colorScheme="blue"
                                        position="absolute"
                                        bottom={0}
                                        right={0}
                                        borderRadius="full"
                                    />
                                )} */}
                            </Box>
                            <Text fontSize="2xl" fontWeight="bold">
                                {user.name}
                            </Text>
                            <Text color="gray.500" mb={4}>
                                @{user.username}
                            </Text>

                            {!editMode ? (
                                <Button
                                    leftIcon={<FiEdit />}
                                    colorScheme="blue"
                                    onClick={() => setEditMode(true)}
                                    w="full"
                                >
                                    {t("profile.fields.actions.edit")}
                                </Button>
                            ) : (
                                <HStack spacing={4} w="full">
                                    <Button
                                        leftIcon={<FiSave />}
                                        colorScheme="green"
                                        onClick={handleSave}
                                        flex={1}
                                    >
                                        {t("profile.fields.actions.save")}
                                    </Button>
                                    <Button
                                        leftIcon={<FiX />}
                                        colorScheme="red"
                                        onClick={handleCancel}
                                        flex={1}
                                    >
                                        {t("profile.fields.actions.cancel")}
                                    </Button>
                                </HStack>
                            )}
                        </Flex>

                        <VStack
                            spacing={4}
                            align="stretch"
                            p={8}
                            flex={1}
                            divider={<Divider />}
                        >
                            <FormControl isInvalid={!!errors.name}>
                                <Flex align="center" mb={2}>
                                    <FiUser />
                                    <FormLabel ml={2} mb={0}>
                                        {t("profile.fields.fullName")}
                                    </FormLabel>
                                </Flex>
                                {editMode ? (
                                    <>
                                        <Input
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <FormErrorMessage>
                                                {errors.name}
                                            </FormErrorMessage>
                                        )}
                                    </>
                                ) : (
                                    <Text>{user.name}</Text>
                                )}
                            </FormControl>

                            <FormControl isInvalid={!!errors.email}>
                                <Flex align="center" mb={2}>
                                    <FiMail />
                                    <FormLabel ml={2} mb={0}>
                                        Email
                                    </FormLabel>
                                </Flex>
                                {editMode ? (
                                    <>
                                        <Input
                                            disabled
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            type="email"
                                        />
                                        {errors.email && (
                                            <FormErrorMessage>
                                                {errors.email}
                                            </FormErrorMessage>
                                        )}
                                    </>
                                ) : (
                                    <Text>{user.email}</Text>
                                )}
                            </FormControl>

                            <FormControl>
                                <Flex align="center" mb={2}>
                                    <FiUser />
                                    <FormLabel ml={2} mb={0}>
                                        {t("profile.fields.userName")}
                                    </FormLabel>
                                </Flex>
                                {editMode ? (
                                    <Input
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        isReadOnly
                                        bg="gray.100"
                                    />
                                ) : (
                                    <Text>{user.username}</Text>
                                )}
                            </FormControl>

                            <FormControl isInvalid={!!errors.phone}>
                                <Flex align="center" mb={2}>
                                    <FiPhone />
                                    <FormLabel ml={2} mb={0}>
                                        {t("profile.fields.phoneNumber")}
                                    </FormLabel>
                                </Flex>
                                {editMode ? (
                                    <>
                                        <Input
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && (
                                            <FormErrorMessage>
                                                {errors.phone}
                                            </FormErrorMessage>
                                        )}
                                    </>
                                ) : (
                                    <Text>{user.phone}</Text>
                                )}
                            </FormControl>

                            <FormControl>
                                <Flex align="center" mb={2}>
                                    <FiUser />
                                    <FormLabel ml={2} mb={0}>
                                        {t("profile.fields.gender")}
                                    </FormLabel>
                                </Flex>
                                {editMode ? (
                                    <Select
                                        name="gender"
                                        value={user.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </Select>
                                ) : (
                                    <Text>
                                        {user.gender === "male"
                                            ? "Nam"
                                            : user.gender === "female"
                                                ? "Nữ"
                                                : "Khác"}
                                    </Text>
                                )}
                            </FormControl>
                        </VStack>
                    </Flex>
                </Flex>
            </Container> : ""}
        </MainTemPlate>
    );
};

export default Profile;
