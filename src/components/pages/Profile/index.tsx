// import {
//     Avatar,
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     HStack,
//     Input,
//     Select,
//     Text,
//     VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import {
//     FaUser,
//     FaEnvelope,
//     FaPhone,
//     FaImage,
//     FaTransgender,
// } from "react-icons/fa";
// import { MdPassword } from "react-icons/md";
// import MainTemplate from "../../templates/MainTemPlate";

// type UserType = {
//     username: string;
//     email: string;
//     password: string;
//     phone: string;
//     name: string;
//     gender: string;
//     image: string;
//     uid: string;
// };

// const initialUser: UserType = {
//     username: "van123",
//     email: "van@gmail.com",
//     password: "",
//     phone: "0123456789",
//     name: "Ngô Ngọc Văn",
//     gender: "male",
//     image: "",
//     uid: "abc-uid-123",
// };

// const Profile = () => {
//     const [user, setUser] = useState<UserType>(initialUser);

//     const handleChange = (field: keyof UserType, value: string) => {
//         setUser((prev) => ({ ...prev, [field]: value }));
//     };

//     const handleSave = () => {
//         console.log("Updated user:", user);
//     };

//     return (
//         <MainTemplate>
//             <Box maxW="600px" mx="auto" p={6}>
//                 <Text fontSize="2xl" fontWeight="bold" mb={4}>
//                     Profile
//                 </Text>

//                 <VStack spacing={4} align="stretch">
//                     <HStack spacing={6}>
//                         <Avatar size="xl" src={user.image} />
//                         <FormControl>
//                             <FormLabel>
//                                 <FaImage
//                                     style={{
//                                         display: "inline",
//                                         marginRight: "8px",
//                                     }}
//                                 />
//                                 Image URL
//                             </FormLabel>
//                             <Input
//                                 value={user.image}
//                                 onChange={(e) =>
//                                     handleChange("image", e.target.value)
//                                 }
//                             />
//                         </FormControl>
//                     </HStack>

//                     <FormControl>
//                         <FormLabel>
//                             <FaUser
//                                 style={{
//                                     display: "inline",
//                                     marginRight: "8px",
//                                 }}
//                             />
//                             Username
//                         </FormLabel>
//                         <Input
//                             value={user.username}
//                             onChange={(e) =>
//                                 handleChange("username", e.target.value)
//                             }
//                         />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>
//                             <FaEnvelope
//                                 style={{
//                                     display: "inline",
//                                     marginRight: "8px",
//                                 }}
//                             />
//                             Email
//                         </FormLabel>
//                         <Input
//                             type="email"
//                             value={user.email}
//                             onChange={(e) =>
//                                 handleChange("email", e.target.value)
//                             }
//                         />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>
//                             <MdPassword
//                                 style={{
//                                     display: "inline",
//                                     marginRight: "8px",
//                                 }}
//                             />
//                             Password
//                         </FormLabel>
//                         <Input
//                             type="password"
//                             value={user.password}
//                             onChange={(e) =>
//                                 handleChange("password", e.target.value)
//                             }
//                         />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>
//                             <FaPhone
//                                 style={{
//                                     display: "inline",
//                                     marginRight: "8px",
//                                 }}
//                             />
//                             Phone
//                         </FormLabel>
//                         <Input
//                             value={user.phone}
//                             onChange={(e) =>
//                                 handleChange("phone", e.target.value)
//                             }
//                         />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Full Name</FormLabel>
//                         <Input
//                             value={user.name}
//                             onChange={(e) =>
//                                 handleChange("name", e.target.value)
//                             }
//                         />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>
//                             <FaTransgender
//                                 style={{
//                                     display: "inline",
//                                     marginRight: "8px",
//                                 }}
//                             />
//                             Gender
//                         </FormLabel>
//                         <Select
//                             value={user.gender}
//                             onChange={(e) =>
//                                 handleChange("gender", e.target.value)
//                             }
//                         >
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </Select>
//                     </FormControl>

//                     <FormControl isReadOnly>
//                         <FormLabel>UID</FormLabel>
//                         <Input value={user.uid} />
//                     </FormControl>

//                     <Button colorScheme="blue" onClick={handleSave}>
//                         Save
//                     </Button>
//                 </VStack>
//             </Box>
//         </MainTemplate>
//     );
// };

// export default Profile;

import {
    Box,
    Flex,
    Heading,
    Text,
    Avatar,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    useToast,
    VStack,
    HStack,
    Container,
    Divider,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import MainTemPlate from "../../templates/MainTemPlate";
import { FiUser, FiMail, FiPhone, FiEdit, FiSave, FiX } from "react-icons/fi";

// Định nghĩa kiểu dữ liệu cho User
interface User {
    username: string;
    email: string;
    phone: string;
    name: string;
    gender: string;
    image: string;
    uid: string;
}

const Profile = () => {
    const initialUser: User = {
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "+84123456789",
        name: "John Doe",
        gender: "male",
        image: "https://bit.ly/broken-link",
        uid: "user123456",
    };

    const [user, setUser] = useState<User>(initialUser);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const toast = useToast();

    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
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

    const handleSave = () => {
        if (validateForm()) {
            toast({
                title: "Lưu thành công",
                description: "Thông tin cá nhân đã được cập nhật",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEditMode(false);
        }
    };

    const handleCancel = () => {
        setUser(initialUser);
        setErrors({});
        setEditMode(false);
    };

    return (
        <MainTemPlate>
            <Container maxW="container.md" py={8}>
                <Flex direction="column" align="center">
                    <Heading size="xl" mb={8}>
                        Hồ Sơ Cá Nhân
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
                            bg={useColorModeValue("gray.50", "gray.800")}
                            w={{ base: "full", md: "40%" }}
                        >
                            <Box position="relative" mb={4}>
                                <Avatar
                                    size="2xl"
                                    name={user.name}
                                    src={user.image}
                                    mb={2}
                                />
                                {editMode && (
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
                                )}
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
                                    Chỉnh sửa thông tin
                                </Button>
                            ) : (
                                <HStack spacing={4} w="full">
                                    <Button
                                        leftIcon={<FiSave />}
                                        colorScheme="green"
                                        onClick={handleSave}
                                        flex={1}
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        leftIcon={<FiX />}
                                        colorScheme="red"
                                        onClick={handleCancel}
                                        flex={1}
                                    >
                                        Hủy
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
                                        Họ và tên
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
                                        Tên đăng nhập
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
                                        Số điện thoại
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
                                        Giới tính
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
            </Container>
        </MainTemPlate>
    );
};

export default Profile;
