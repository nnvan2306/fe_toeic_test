import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    Select,
    Spacer,
    Tag,
    Text,
    Textarea,
    Tooltip,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { BsPlus, BsPencil, BsImage, BsTrash } from "react-icons/bs";
import { ReactNode, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import icons from "../../../constants/icons";
import { useUploadFile } from "../../../services/upload/upload";
import { useCreateExam } from "../../../services/exam/create";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExam } from "../../../services/exam/get-exam";
import { useUpdateExam } from "../../../services/exam/update";
import toast from "../../../libs/toast";
import { getAxiosError } from "../../../libs/axios";
import { routesMap } from "../../../routes/routes";

type AnswerType = {
    uuid: string;
    content: string;
    isCorect: boolean;
    isChoose: boolean;
};

export type QuestionType = {
    uuid: string;
    title: string;
    audio: string;
    image: string;
    answers: AnswerType[];
};

const defaultAnswer: AnswerType = {
    uuid: "",
    content: "",
    isCorect: false,
    isChoose: false,
};

const defaultQuestion: QuestionType = {
    uuid: "",
    title: "",
    audio: "",
    image: "",
    answers: [],
};

const ExamNew = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const bgCard = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    // const [time, setTime] = useState(0);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("fulltest");
    const [description, setDescription] = useState("");
    const [idUpload, setIdUpload] = useState("");
    const [question, setQuestion] = useState<QuestionType[]>([]);

    const { data: examData } = useGetExam({ id: Number(id) || 0 });

    const handleUpdateQuestion = (updated: QuestionType) => {
        setQuestion((prev) =>
            prev.map((q) => (q.uuid === updated.uuid ? updated : q))
        );
    };

    const uploadFile = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                handleUpdateQuestion({
                    ...question.find((q) => q.uuid === idUpload)!,
                    image: data?.data || "",
                });
            },
        },
    });

    const uploadAudio = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                handleUpdateQuestion({
                    ...question.find((q) => q.uuid === idUpload)!,
                    audio: data?.data || "",
                });
            },
        },
    });

    const { mutate: create, isPending } = useCreateExam({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Tạo bài kiểm tra thành công",
                });
                navigate(routesMap.ExamManager);
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const { mutate: update, isPending: isPendingUpdate } = useUpdateExam({
        mutationConfig: {
            onSuccess() {
                toast({
                    status: "success",
                    title: "Cập nhật bài kiểm tra thành công",
                });
                navigate(routesMap.ExamManager);
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const handleUploadImage = (uuid: string, file: File) => {
        setIdUpload(uuid);
        const formData = new FormData();
        formData.append("file", file);
        setIdUpload(uuid);
        uploadFile.mutate(formData);
    };

    const handleUploadAudio = (uuid: string, file: File) => {
        setIdUpload(uuid);
        const formData = new FormData();
        formData.append("file", file);
        setIdUpload(uuid);
        uploadAudio.mutate(formData);
    };

    const handleSubmit = () => {
        if (!title || !description) {
            return;
        }
        const payload = {
            title,
            // time,
            type,
            description,
            questions: question,
        };
        if (id) {
            update({ id: Number(id), ...payload });
        } else {
            create(payload);
        }
    };

    useEffect(() => {
        if (!id) {
            setTitle("");
            setType("fulltest");
            setDescription("");
            setQuestion([]);
        } else {
            const data = examData?.data;
            if (data) {
                setTitle(data?.title || "");
                setType(data?.type || "fulltest");
                setDescription(data?.description);
                setQuestion(JSON.parse(data?.questions));
            }
        }
    }, [examData, id]);

    return (
        <ManagerTemplate>
            <Box>
                <Flex align="center" mb={4}>
                    <TitleManage title={id ? "Edit Exam" : "New Exam"} />
                    <Spacer />
                    <Tag
                        size="lg"
                        colorScheme={type === "toeic" ? "blue" : "green"}
                    >
                        {type === "toeic" ? "TOEIC" : "Fulltest"}
                    </Tag>
                </Flex>

                <Box
                    w="100%"
                    p={6}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="md"
                    bg={bgCard}
                    boxShadow="sm"
                >
                    <Grid templateColumns="repeat(2, 1fr)" gap={8} mb={8}>
                        <FormCommon title="Title" isRequired>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter exam title"
                                size="md"
                            />
                        </FormCommon>

                        <FormCommon title="Type">
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                size="md"
                            >
                                <option value="toeic">TOEIC</option>
                                <option value="fulltest">Fulltest</option>
                            </Select>
                        </FormCommon>
                        <GridItem colSpan={2}>
                            <FormCommon title="Description" isRequired>
                                <Textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Enter exam description"
                                    size="md"
                                    minH="260px"
                                />
                            </FormCommon>
                        </GridItem>
                        {/* <FormCommon title="Time" isRequired>
                            <Input
                                type="number"
                                value={time}
                                onChange={(e) =>
                                    setTime(Number(e.target.value))
                                }
                                placeholder="Enter exam title"
                                size="md"
                            />
                        </FormCommon> */}
                    </Grid>

                    <Divider my={6} />

                    <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="xl" fontWeight="bold">
                            Questions ({question.length})
                        </Text>
                    </Flex>

                    <VStack w="100%" spacing={6}>
                        {question.length === 0 ? (
                            <Box
                                py={10}
                                textAlign="center"
                                borderWidth="1px"
                                borderStyle="dashed"
                                borderColor={borderColor}
                                borderRadius="md"
                                w="100%"
                            >
                                <Text color="gray.500" mb={4}>
                                    No questions added yet
                                </Text>
                                <Button
                                    onClick={() =>
                                        setQuestion((prev) => [
                                            ...prev,
                                            {
                                                ...defaultQuestion,
                                                uuid: uuidv4(),
                                            },
                                        ])
                                    }
                                    leftIcon={<Icon as={BsPlus} />}
                                    colorScheme="blue"
                                    size="sm"
                                >
                                    Add Your First Question
                                </Button>
                            </Box>
                        ) : (
                            question.map((q, index) => (
                                <QuestionItem
                                    key={q.uuid}
                                    item={q}
                                    index={index + 1}
                                    onUpdate={handleUpdateQuestion}
                                    onRemove={() =>
                                        setQuestion((prev) =>
                                            prev.filter(
                                                (item) => item.uuid !== q.uuid
                                            )
                                        )
                                    }
                                    onUploadImage={handleUploadImage}
                                    onUploadAudio={handleUploadAudio}
                                />
                            ))
                        )}
                    </VStack>
                    {question.length ? (
                        <Button
                            onClick={() =>
                                setQuestion((prev) => [
                                    ...prev,
                                    { ...defaultQuestion, uuid: uuidv4() },
                                ])
                            }
                            leftIcon={<Icon as={BsPlus} />}
                            colorScheme="blue"
                            size="md"
                            mt={2}
                        >
                            Add Question
                        </Button>
                    ) : null}

                    <Divider my={8} />

                    <Flex justify="center" mt={4}>
                        <Button
                            onClick={handleSubmit}
                            colorScheme="green"
                            size="lg"
                            px={12}
                            isDisabled={!title || !description}
                            isLoading={isPending || isPendingUpdate}
                        >
                            {id ? "Update Exam" : "Create Exam"}
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </ManagerTemplate>
    );
};

export default ExamNew;

const FormCommon = ({
    title,
    children,
    action,
    isRequired = false,
}: {
    title: string;
    children: ReactNode;
    action?: () => void;
    isRequired?: boolean;
}) => (
    <FormControl>
        <Flex justify="space-between" align="center" mb={2}>
            <FormLabel
                fontWeight={600}
                mb={0}
                textTransform="capitalize"
                fontSize="md"
            >
                {title}{" "}
                {isRequired && (
                    <Text as="span" color="red.500">
                        *
                    </Text>
                )}
            </FormLabel>
            {action && (
                <Button
                    onClick={action}
                    size="xs"
                    variant="outline"
                    colorScheme="blue"
                >
                    Upload
                </Button>
            )}
        </Flex>
        {children}
    </FormControl>
);

const QuestionItem = ({
    item,
    index,
    onUpdate,
    onRemove,
    onUploadImage,
    onUploadAudio,
}: {
    item: QuestionType;
    index: number;
    onUpdate: (updated: QuestionType) => void;
    onRemove: () => void;
    onUploadImage: (uuid: string, file: File) => void;
    onUploadAudio: (uuid: string, file: File) => void;
}) => {
    const refInput = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLInputElement>(null);
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const bgQuestion = useColorModeValue("gray.50", "gray.700");

    const updateField = (field: Partial<QuestionType>) =>
        onUpdate({ ...item, ...field });

    const updateAnswer = (ans: AnswerType) =>
        onUpdate({
            ...item,
            answers: item.answers.map((a) => (a.uuid === ans.uuid ? ans : a)),
        });

    return (
        <Box
            w="100%"
            border="1px solid"
            borderColor={borderColor}
            p={6}
            rounded="md"
            position="relative"
            bg={bgQuestion}
            boxShadow="sm"
        >
            <Flex position="absolute" top={3} right={3} align="center" gap={2}>
                <Tag size="md" colorScheme="purple">
                    Question {index}
                </Tag>
                <Tooltip label="Remove Question" placement="top">
                    <IconButton
                        aria-label="Remove question"
                        icon={<Icon as={icons.close} />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        rounded="full"
                        onClick={onRemove}
                    />
                </Tooltip>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
                <FormCommon title="Question Title" isRequired>
                    <Input
                        value={item.title}
                        onChange={(e) => updateField({ title: e.target.value })}
                        placeholder="Enter question"
                    />
                </FormCommon>

                <GridItem rowSpan={2}>
                    <FormCommon title="Image">
                        <input
                            type="file"
                            hidden
                            ref={refInput}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onUploadImage(item.uuid, file);
                            }}
                        />
                        {item.image ? (
                            <Box position="relative">
                                <Image
                                    alt="Question image"
                                    src={item.image}
                                    h="200px"
                                    w="100%"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                                <HStack
                                    position="absolute"
                                    bottom={2}
                                    right={2}
                                >
                                    <IconButton
                                        aria-label="Change image"
                                        icon={<Icon as={BsPencil} />}
                                        size="sm"
                                        onClick={() =>
                                            refInput.current?.click()
                                        }
                                    />
                                    <IconButton
                                        aria-label="Change image"
                                        icon={<Icon as={BsTrash} color="red" />}
                                        size="sm"
                                        onClick={() =>
                                            updateField({ image: "" })
                                        }
                                    />
                                </HStack>
                            </Box>
                        ) : (
                            <Box
                                h="200px"
                                border="1px dashed"
                                borderColor={borderColor}
                                rounded="md"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                onClick={() =>
                                    item.audio
                                        ? null
                                        : refInput.current?.click()
                                }
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    bg: useColorModeValue(
                                        "gray.50",
                                        "gray.700"
                                    ),
                                }}
                            >
                                <Icon
                                    as={BsImage}
                                    fontSize="3xl"
                                    mb={2}
                                    color="gray.400"
                                />
                                <Text color="gray.500">
                                    Click to upload image
                                </Text>
                            </Box>
                        )}
                    </FormCommon>
                </GridItem>

                <FormCommon title="Audio">
                    <input
                        type="file"
                        hidden
                        ref={audioRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUploadAudio(item.uuid, file);
                        }}
                    />

                    <Box
                        border="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        p={3}
                    >
                        {item.audio ? (
                            <HStack spacing={4}>
                                <audio controls style={{ width: "100%" }}>
                                    <source src={item.audio} type="audio/ogg" />
                                    <source
                                        src={item.audio}
                                        type="audio/mpeg"
                                    />
                                </audio>
                                <HStack>
                                    <IconButton
                                        aria-label="Change audio"
                                        icon={<Icon as={BsPencil} />}
                                        size="sm"
                                        onClick={() =>
                                            audioRef.current?.click()
                                        }
                                    />
                                    <IconButton
                                        aria-label="Change audio"
                                        icon={<Icon as={BsTrash} color="red" />}
                                        size="sm"
                                        onClick={() =>
                                            updateField({ audio: "" })
                                        }
                                    />
                                </HStack>
                            </HStack>
                        ) : (
                            <Button
                                onClick={() =>
                                    item.image
                                        ? null
                                        : audioRef.current?.click()
                                }
                                w="100%"
                                variant="outline"
                                leftIcon={
                                    <Icon
                                        as={
                                            icons.audio ||
                                            (() => <span>🔊</span>)
                                        }
                                    />
                                }
                            >
                                Upload Audio
                            </Button>
                        )}
                    </Box>
                </FormCommon>

                <GridItem colSpan={2}>
                    <FormCommon title="Answer Options">
                        <VStack align="stretch" spacing={3} mt={2}>
                            {item.answers.length === 0 ? (
                                <Box
                                    py={4}
                                    textAlign="center"
                                    borderWidth="1px"
                                    borderStyle="dashed"
                                    borderColor={borderColor}
                                    borderRadius="md"
                                >
                                    <Text color="gray.500" mb={2}>
                                        No answer options added
                                    </Text>
                                </Box>
                            ) : (
                                item.answers.map((ans, ansIndex) => (
                                    <Flex
                                        key={ans.uuid}
                                        // eslint-disable-next-line react-hooks/rules-of-hooks
                                        bg={useColorModeValue(
                                            "white",
                                            "gray.800"
                                        )}
                                        p={3}
                                        borderRadius="md"
                                        borderWidth="1px"
                                        borderColor={
                                            ans.isCorect
                                                ? "green.300"
                                                : borderColor
                                        }
                                        align="center"
                                    >
                                        <Tag
                                            size="sm"
                                            mr={3}
                                            colorScheme="blue"
                                        >
                                            {String.fromCharCode(65 + ansIndex)}
                                        </Tag>
                                        <InputGroup flex={1}>
                                            <Input
                                                value={ans.content}
                                                onChange={(e) =>
                                                    updateAnswer({
                                                        ...ans,
                                                        content: e.target.value,
                                                    })
                                                }
                                                placeholder={`Answer option ${
                                                    ansIndex + 1
                                                }`}
                                                borderColor="transparent"
                                                _focus={{
                                                    borderColor: "blue.300",
                                                }}
                                            />
                                        </InputGroup>
                                        <Tooltip label="Mark as correct answer">
                                            <Checkbox
                                                ml={2}
                                                colorScheme="green"
                                                size="lg"
                                                isChecked={ans.isCorect}
                                                onChange={() =>
                                                    updateField({
                                                        answers:
                                                            item.answers.map(
                                                                (a) => ({
                                                                    ...a,
                                                                    isCorect:
                                                                        a.uuid ===
                                                                        ans.uuid,
                                                                })
                                                            ),
                                                    })
                                                }
                                            />
                                        </Tooltip>
                                        <IconButton
                                            aria-label="Remove answer"
                                            icon={
                                                <Icon
                                                    as={
                                                        icons.delete ||
                                                        (() => <span>🗑️</span>)
                                                    }
                                                />
                                            }
                                            variant="ghost"
                                            colorScheme="red"
                                            size="sm"
                                            ml={2}
                                            onClick={() =>
                                                updateField({
                                                    answers:
                                                        item.answers.filter(
                                                            (a) =>
                                                                a.uuid !==
                                                                ans.uuid
                                                        ),
                                                })
                                            }
                                        />
                                    </Flex>
                                ))
                            )}
                            <Button
                                onClick={() =>
                                    updateField({
                                        answers: [
                                            ...item.answers,
                                            {
                                                ...defaultAnswer,
                                                uuid: uuidv4(),
                                            },
                                        ],
                                    })
                                }
                                leftIcon={
                                    <Icon
                                        as={icons.add || (() => <span>+</span>)}
                                    />
                                }
                                size="sm"
                                colorScheme="blue"
                                variant="outline"
                                w="fit-content"
                            >
                                Add Answer Option
                            </Button>
                        </VStack>
                    </FormCommon>
                </GridItem>
            </Grid>
        </Box>
    );
};
