import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    List,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiMail, FiPhone, FiSave, FiUser, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { formatDate } from "../../../helpers/formatdate";
import api from "../../../libs/axios";
import { useGetHistories } from "../../../services/history/get-by-user";
import { setUserSlice } from "../../../store/features/user/userSlice";
import { UserResponseType } from "../../../types/user";
import MainTemPlate from "../../templates/MainTemPlate";
import { QuestionType } from "../ExamNew";

interface Exam {
    id?: number;
    title: string;
    score: number;
    date: string;
    created_at?: string;
    Exam?: { title: string };
    questions: string;
}

const ExamModal = ({ isOpen, onClose, exam, t }: { isOpen: boolean; onClose: () => void; exam: Exam; t: (key: string) => string }) => {
    const questions: QuestionType[] = JSON.parse(exam.questions);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "4xl" }} isCentered>
            <ModalOverlay bg="blackAlpha.600" />
            <ModalContent borderRadius="xl" boxShadow="2xl" bg="white" m={{ base: 2, md: 4 }}>
                <ModalHeader fontSize="2xl" fontWeight="bold" color="gray.800" textAlign="center" py={4}>
                    {exam.title}
                </ModalHeader>
                <ModalCloseButton size="lg" color="gray.600" _hover={{ color: "gray.800" }} />
                <ModalBody maxH={{ base: "80vh", md: "70vh" }} overflowY="auto" px={{ base: 4, md: 6 }} py={6}>
                    <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
                        <Text fontSize="lg" color="gray.700" fontWeight="semibold" mb={2}>
                            {t("Score")}: {exam.score}
                        </Text>
                        <Text fontSize="lg" color="gray.700" fontWeight="semibold">
                            {t("Score")}: {exam.date}
                        </Text>
                    </Box>
                    <Box maxW={{ base: "100%", md: "80%" }} mx="auto">
                        {questions?.length ? questions.map((item: QuestionType, index: number) => {
                            const isCorrect = item.answers.find((a) => a.isChoose)?.isCorect;
                            return (
                                <Card
                                    key={item.uuid}
                                    variant="outline"
                                    borderWidth="2px"
                                    borderColor={isCorrect ? "green.400" : "red.400"}
                                    bg={isCorrect ? "green.50" : "red.50"}
                                    borderRadius="lg"
                                    p={4}
                                    mb={4}
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg" }}
                                >
                                    <CardBody>
                                        <Text
                                            fontSize="md"
                                            fontWeight="bold"
                                            color={isCorrect ? "green.700" : "red.700"}
                                            mb={3}
                                            textAlign="center"
                                        >
                                            {isCorrect ? t("Correct") : t("Incorrect")}
                                        </Text>
                                        <Text fontSize="lg" fontWeight="semibold" mb={4}>
                                            {index + 1}. {item.title}
                                        </Text>
                                        {item.audio && (
                                            <Box bg="gray.100" p={3} borderRadius="md" mb={4} textAlign="center">
                                                <audio controls style={{ width: "100%", maxWidth: "400px" }}>
                                                    <source src={item.audio} type="audio/ogg" />
                                                    <source src={item.audio} type="audio/mpeg" />
                                                </audio>
                                            </Box>
                                        )}
                                        {item.image && (
                                            <Box bg="gray.100" p={3} borderRadius="md" mb={4} textAlign="center">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    maxH="200px"
                                                    objectFit="contain"
                                                    mx="auto"
                                                    borderRadius="md"
                                                />
                                            </Box>
                                        )}
                                        <RadioGroup
                                            value={item.answers.find((a) => a.isChoose)?.uuid || ""}
                                            colorScheme={isCorrect ? "green" : "red"}
                                        >
                                            <Stack spacing={3}>
                                                {item.answers.map((option) => (
                                                    <Radio
                                                        key={option.uuid}
                                                        value={option.uuid}
                                                        isDisabled
                                                        colorScheme={option.isCorect ? "green" : "red"}
                                                    >
                                                        <Text
                                                            color={option.isCorect ? "green.600" : "gray.600"}
                                                            fontWeight={option.isCorect ? "bold" : "normal"}
                                                        >
                                                            {option.content}
                                                            {option.isCorect && " (Correct)"}
                                                        </Text>
                                                    </Radio>
                                                ))}
                                            </Stack>
                                        </RadioGroup>
                                    </CardBody>
                                </Card>
                            );
                        }) : (
                            <Text textAlign="center" color="gray.500">
                                {t("No questions available")}
                            </Text>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        onClick={onClose}
                        size="lg"
                        px={6}
                        borderRadius="md"
                        _hover={{ bg: "blue.600" }}
                    >
                        {t("Close")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
const ExamList = ({ exams, t }: { exams: Exam[]; t: (key: string) => string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

    const handleOpenModal = (exam: Exam) => {
        setSelectedExam(exam);
        onOpen();
    };

    return (
        <>
            <List
                styleType="none"
                p={0}
                m={0}
                display="flex"
                flexDirection="column"
                gap={4}
                cursor="pointer"
            >
                {exams.length > 0 ? exams.map((exam, index) => (
                    <Box
                        as="li"
                        key={index}
                        bg="gray.50"
                        p={4}
                        borderRadius="md"
                        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                        transition="transform 0.2s ease-in-out"
                        _hover={{ transform: "translateY(-2px)" }}
                        onClick={() => handleOpenModal(exam)}
                    >
                        <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
                            {exam.title}
                        </Text>
                        <Text fontSize="md" color="gray.600" my={1}>
                            {t("Point")}: {exam.score}
                        </Text>
                        <Text fontSize="md" color="gray.600" my={1}>
                            {t("Date")}: {exam.date}
                        </Text>

                    </Box>
                )) : null}
            </List>
            {selectedExam && (
                <ExamModal
                    isOpen={isOpen}
                    onClose={onClose}
                    exam={selectedExam}
                    t={t}
                />
            )}
        </>
    );
};

const Profile = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const setUser = (user: UserResponseType) => {
        dispatch(setUserSlice(user));
    };

    const [editMode, setEditMode] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const toast = useToast();

    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const avatarBg = useColorModeValue("gray.50", "gray.800");

    const { data } = useGetHistories({ id: user?.id || 0 });
    const exams = useMemo(
        () =>
            (data?.data || []).map((item) => ({
                ...item,
                title: item?.Exam?.title || "",
                score: JSON.parse(item.score),
                date: formatDate(item?.created_at),
            })),
        [data]
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (user) {
            setUser({
                ...user,
                [name]: value,
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
                });

                toast({
                    title: "Lưu thành công",
                    description: "Thông tin cá nhân đã được cập nhật",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setEditMode(false);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Có lỗi xảy ra",
                });
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
            {user ? (
                <VStack w="100%" pb={10}>
                    <Container maxW="container.md" py={8}>
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
                                    </Box>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {user.name}
                                    </Text>
                                    <Text color="gray.500" mb={4}>
                                        @{user.name}
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
                                                {t(
                                                    "profile.fields.actions.save"
                                                )}
                                            </Button>
                                            <Button
                                                leftIcon={<FiX />}
                                                colorScheme="red"
                                                onClick={handleCancel}
                                                flex={1}
                                            >
                                                {t(
                                                    "profile.fields.actions.cancel"
                                                )}
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

                                    <FormControl isInvalid={!!errors.phone}>
                                        <Flex align="center" mb={2}>
                                            <FiPhone />
                                            <FormLabel ml={2} mb={0}>
                                                {t(
                                                    "profile.fields.phoneNumber"
                                                )}
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
                                                placeholder="Khác"
                                            >
                                                <option value="male">
                                                    Nam
                                                </option>
                                                <option value="female">
                                                    Nữ
                                                </option>
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
                    <Box w="80%">
                        <ExamList exams={exams} t={t} />
                    </Box>
                </VStack>
            ) : (
                ""
            )}
        </MainTemPlate>
    );
};

export default Profile;