import {
    Box,
    Button,
    Checkbox,
    Grid,
    GridItem,
    HStack,
    Icon,
    Image,
    Input,
    Select,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TitleManage from "../../atoms/TitleManage";
import icons from "../../../constants/icons";
import { useUploadFile } from "../../../services/upload/upload";

type AnswerType = {
    uuid: string;
    content: string;
    isCorect: boolean;
    isChoose: boolean;
};

type QuestionType = {
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
    const [title, setTitle] = useState("");
    const [type, setType] = useState("toeic");
    const [idUpload, setIdUpload] = useState("");
    const [isUploadImage, setIsUploadImage] = useState(false);
    const [question, setQuestion] = useState<QuestionType[]>([]);

    const handleUpdateQuestion = (updated: QuestionType) => {
        setQuestion((prev) =>
            prev.map((q) => (q.uuid === updated.uuid ? updated : q))
        );
    };

    const uploadFile = useUploadFile({
        mutationConfig: {
            onSuccess(data) {
                if (isUploadImage) {
                    handleUpdateQuestion({
                        ...question.find((q) => q.uuid === idUpload)!,
                        image: data?.data || "",
                    });
                } else {
                    handleUpdateQuestion({
                        ...question.find((q) => q.uuid === idUpload)!,
                        audio: data?.data || "",
                    });
                }
            },
        },
    });

    const handleUploadImage = (uuid: string, file: File) => {
        setIdUpload(uuid);
        setIsUploadImage(true);
        const formData = new FormData();
        formData.append("file", file);
        setIdUpload(uuid);
        uploadFile.mutate(formData);
        setIsUploadImage(false);
    };

    const handleUploadAudio = (uuid: string, file: File) => {
        setIdUpload(uuid);
        const formData = new FormData();
        formData.append("file", file);
        setIdUpload(uuid);
        uploadFile.mutate(formData);
    };

    const handleSubmit = () => {
        console.log({ title, type, question });
    };

    return (
        <ManagerTemplate>
            <Box>
                <TitleManage title="New Exam" />
                <Box w="100%" p={6} border="1px solid #ccc">
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
                        <FormCommon title="Title">
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormCommon>
                        <FormCommon title="Type">
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="toeic">Toeic</option>
                                <option value="full">Full</option>
                            </Select>
                        </FormCommon>
                    </Grid>

                    <VStack w="100%" gap={4}>
                        {question.map((q) => (
                            <QuestionItem
                                key={q.uuid}
                                item={q}
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
                        ))}
                    </VStack>

                    <HStack justifyContent="start" mt={4}>
                        <Button
                            onClick={() =>
                                setQuestion((prev) => [
                                    ...prev,
                                    { ...defaultQuestion, uuid: uuidv4() },
                                ])
                            }
                        >
                            Add Question
                        </Button>
                    </HStack>

                    <HStack justifyContent="center" mt={4}>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </HStack>
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
}: {
    title: string;
    children: ReactNode;
    action?: () => void;
}) => (
    <Box>
        <HStack justifyContent="space-between">
            <Text
                fontSize={16}
                fontWeight={500}
                mb={1}
                textTransform="capitalize"
            >
                {title}
            </Text>
            {action && <Text onClick={action}>Upload</Text>}
        </HStack>
        {children}
    </Box>
);

const QuestionItem = ({
    item,
    onUpdate,
    onRemove,
    onUploadImage,
    onUploadAudio,
}: {
    item: QuestionType;
    onUpdate: (updated: QuestionType) => void;
    onRemove: () => void;
    onUploadImage: (uuid: string, file: File) => void;
    onUploadAudio: (uuid: string, file: File) => void;
}) => {
    const refInput = useRef<HTMLInputElement>(null);

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
            key={item.uuid}
            border="1px solid #ccc"
            p={4}
            rounded={8}
            position="relative"
        >
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormCommon title="Question Title">
                    <Input
                        value={item.title}
                        onChange={(e) => updateField({ title: e.target.value })}
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
                            <Image
                                alt="image"
                                src={item.image}
                                h="200px"
                                objectFit="cover"
                            />
                        ) : (
                            <Box
                                h="200px"
                                border="1px dashed"
                                borderColor="#ccc"
                                rounded={6}
                                onClick={() => refInput.current?.click()}
                            />
                        )}
                    </FormCommon>
                </GridItem>

                <FormCommon title="Audio">
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUploadAudio(item.uuid, file);
                        }}
                    />
                    {item.audio ? (
                        <audio controls>
                            <source src={item.audio} type="audio/ogg" />
                            <source src={item.audio} type="audio/mpeg" />
                        </audio>
                    ) : null}
                </FormCommon>

                <FormCommon title="Answers">
                    <VStack align="stretch" spacing={2}>
                        {item.answers.map((ans) => (
                            <HStack key={ans.uuid}>
                                <Input
                                    value={ans.content}
                                    onChange={(e) =>
                                        updateAnswer({
                                            ...ans,
                                            content: e.target.value,
                                        })
                                    }
                                />
                                <Checkbox
                                    isChecked={ans.isCorect}
                                    onChange={() =>
                                        updateField({
                                            answers: item.answers.map((a) => ({
                                                ...a,
                                                isCorect: a.uuid === ans.uuid,
                                            })),
                                        })
                                    }
                                />
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        updateField({
                                            answers: item.answers.filter(
                                                (a) => a.uuid !== ans.uuid
                                            ),
                                        })
                                    }
                                >
                                    Remove
                                </Button>
                            </HStack>
                        ))}
                        <Button
                            size="sm"
                            onClick={() =>
                                updateField({
                                    answers: [
                                        ...item.answers,
                                        { ...defaultAnswer, uuid: uuidv4() },
                                    ],
                                })
                            }
                        >
                            Add Answer
                        </Button>
                    </VStack>
                </FormCommon>
            </Grid>

            <Button
                position="absolute"
                top={-5}
                right={-5}
                rounded="full"
                w="36px"
                h="36px"
                onClick={onRemove}
            >
                <Icon color="red" as={icons.close} fontSize={24} />
            </Button>
        </Box>
    );
};
