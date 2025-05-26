import {
    Badge,
    Box,
    Button,
    Card,
    CardHeader,
    Container,
    Divider,
    Flex,
    Heading,
    Image,
    Progress,
    Radio,
    RadioGroup,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FaBook, FaCheck, FaClock, FaGlobe, FaHeadphones } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import useBlocker from "../../../hooks/useBlocker";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { routesMap } from "../../../routes/routes";
import { useGetExam } from "../../../services/exam/get-exam";
import { useCreateHistory } from "../../../services/history/create";
import MainTemPlate from "../../templates/MainTemPlate";
import { QuestionType } from "../ExamNew";

const ExamDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);

    const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
    const [count, setCount] = useState(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    const { data } = useGetExam({
        id: Number(id) || 0,
    });

    const questionBuild = useMemo(() => {
        const raw = data?.data?.questions;
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error("Lỗi parse JSON:", e);
            return [];
        }
    }, [data]);

    // Split questions into audio and non-audio
    const { audioQuestions, readingQuestions } = useMemo(() => {
        const audioQuestions = questionBuild.filter((q) => q.audio);
        const readingQuestions = questionBuild.filter((q) => !q.audio);
        return { audioQuestions, readingQuestions };
    }, [questionBuild]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleSelectAnswer = (questionUuid: string, answerUuid: string) => {
        const questionIndex = questions.findIndex((q) => q.uuid === questionUuid);
        if (questionIndex === -1) {
            console.error(`Question with UUID ${questionUuid} not found`);
            return;
        }

        const updated = questions.map((q) => {
            if (q.uuid === questionUuid) {
                q.answers = q.answers.map((ans) => ({
                    ...ans,
                    isChoose: ans.uuid === answerUuid,
                }))
            };

            return q
        });

        if (!questions[questionIndex].answers.find((item) => item.isChoose)) {
            setCount(count + 1);
        }

        setQuestions([...updated]);
    };

    const { mutate: createHistory, isPending } = useCreateHistory({
        mutationConfig: {
            onSuccess(data) {
                toast({
                    status: "success",
                    title: "Nộp bài thành công",
                });
                navigate(
                    routesMap.Result.replace("/:id", `/${data?.data?.id}`)
                );
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const handleSubmit = () => {
        if (id && user?.id) {
            createHistory({
                examId: Number(id),
                userId: user.id,
                questions: questions,
                time: 1,
            });
        }
    };

    useEffect(() => {
        setQuestions(questionBuild);
    }, [questionBuild]);

    useEffect(() => {
        if (timeLeft <= 0 || isFinished) {
            setIsFinished(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    useBlocker(true);

    return (
        <MainTemPlate>
            <Container maxW="container.lg" py={8}>
                <VStack spacing={6} align="stretch">
                    <Card variant="outline" w="100%" boxShadow="md">
                        <CardHeader bg="blue.50" borderTopRadius="md">
                            <Flex align="center" justify="space-between">
                                <Flex align="center">
                                    <FaGlobe
                                        size={24}
                                        style={{
                                            marginRight: "12px",
                                            color: "#3182CE",
                                        }}
                                    />
                                    <Heading size="lg">
                                        English Proficiency Test
                                    </Heading>
                                </Flex>
                                <Badge
                                    colorScheme={
                                        timeLeft < 300
                                            ? "red"
                                            : timeLeft < 600
                                                ? "yellow"
                                                : "green"
                                    }
                                    fontSize="xl"
                                    p={2}
                                    borderRadius="md"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <FaClock style={{ marginRight: "8px" }} />
                                    {formatTime(timeLeft)}
                                </Badge>
                            </Flex>
                        </CardHeader>

                        <Box p={4}>
                            <Progress
                                value={(count / questions.length) * 100 || 0}
                                colorScheme="blue"
                                size="sm"
                                borderRadius="md"
                                mb={4}
                            />
                            <Flex justify="space-between" mb={4}>
                                <Text fontWeight="medium">
                                    Overall Progress
                                </Text>
                                <Text>
                                    {questions.length
                                        ? Math.round((count / questions.length) * 100)
                                        : 0}
                                    %
                                </Text>
                            </Flex>
                        </Box>

                        <VStack w="100%" px={4} gap={6} align="stretch">
                            {/* Listening Section */}
                            {audioQuestions.length > 0 && (
                                <Box>
                                    <Flex align="center" mb={4}>
                                        <FaHeadphones size={24} color="#3182CE" style={{ marginRight: "12px" }} />
                                        <Heading size="md" color="gray.800">
                                            Listening Section
                                        </Heading>
                                    </Flex>
                                    <VStack gap={4}>
                                        {audioQuestions.map((item: QuestionType, index: number) => (
                                            <Card
                                                key={item.uuid}
                                                variant="outline"
                                                p={4}
                                                w="100%"
                                                borderColor="blue.200"
                                                bg="blue.50"
                                                borderRadius="lg"
                                                boxShadow="sm"
                                            >
                                                <Text fontWeight="bold" fontSize="lg" mb={3} color="blue.700">
                                                    {index + 1}. {item.title}
                                                </Text>
                                                {item.audio && (
                                                    <Box
                                                        bg="gray.100"
                                                        p={3}
                                                        borderRadius="md"
                                                        textAlign="center"
                                                        mb={4}
                                                    >
                                                        <audio
                                                            controls
                                                            style={{
                                                                width: "100%",
                                                                maxWidth: "400px",
                                                            }}
                                                        >
                                                            <source src={item.audio} type="audio/ogg" />
                                                            <source src={item.audio} type="audio/mpeg" />
                                                        </audio>
                                                    </Box>
                                                )}
                                                {item.image && (
                                                    <Box
                                                        bg="gray.100"
                                                        p={3}
                                                        borderRadius="md"
                                                        textAlign="center"
                                                        mb={4}
                                                    >
                                                        <Image
                                                            alt={item.title}
                                                            src={item.image}
                                                            maxH="200px"
                                                            objectFit="contain"
                                                            borderRadius="md"
                                                        />
                                                    </Box>
                                                )}
                                                <RadioGroup
                                                    onChange={(val) => handleSelectAnswer(item.uuid, val)}
                                                    value={item.answers.find((a) => a.isChoose)?.uuid || ""}
                                                    colorScheme="blue"
                                                >
                                                    <Stack spacing={3}>
                                                        {item.answers.map((option) => (
                                                            <Radio
                                                                key={option.uuid}
                                                                value={option.uuid}
                                                                isDisabled={isFinished || timeLeft <= 0}
                                                            >
                                                                {option.content}
                                                            </Radio>
                                                        ))}
                                                    </Stack>
                                                </RadioGroup>
                                            </Card>
                                        ))}
                                    </VStack>
                                </Box>
                            )}

                            {/* Divider between sections */}
                            {(audioQuestions.length > 0 && readingQuestions.length > 0) && (
                                <Divider my={6} borderColor="gray.300" />
                            )}

                            {/* Reading Section */}
                            {readingQuestions.length > 0 && (
                                <Box>
                                    <Flex align="center" mb={4}>
                                        <FaBook size={24} color="#3182CE" style={{ marginRight: "12px" }} />
                                        <Heading size="md" color="gray.800">
                                            Reading Section
                                        </Heading>
                                    </Flex>
                                    <VStack gap={4}>
                                        {readingQuestions.map((item: QuestionType, index: number) => (
                                            <Card
                                                key={item.uuid}
                                                variant="outline"
                                                p={4}
                                                w="100%"
                                                borderColor="gray.200"
                                                bg="white"
                                                borderRadius="lg"
                                                boxShadow="sm"
                                            >
                                                <Text fontWeight="bold" fontSize="lg" mb={3} color="gray.800">
                                                    {index + 1 + audioQuestions.length}. {item.title}
                                                </Text>
                                                {item.image && (
                                                    <Box
                                                        bg="gray.100"
                                                        p={3}
                                                        borderRadius="md"
                                                        textAlign="center"
                                                        mb={4}
                                                    >
                                                        <Image
                                                            alt={item.title}
                                                            src={item.image}
                                                            maxH="200px"
                                                            objectFit="contain"
                                                            borderRadius="md"
                                                        />
                                                    </Box>
                                                )}
                                                <RadioGroup
                                                    onChange={(val) => handleSelectAnswer(item.uuid, val)}
                                                    value={item.answers.find((a) => a.isChoose)?.uuid || ""}
                                                    colorScheme="blue"
                                                >
                                                    <Stack spacing={3}>
                                                        {item.answers.map((option) => (
                                                            <Radio
                                                                key={option.uuid}
                                                                value={option.uuid}
                                                                isDisabled={isFinished || timeLeft <= 0}
                                                            >
                                                                {option.content}
                                                            </Radio>
                                                        ))}
                                                    </Stack>
                                                </RadioGroup>
                                            </Card>
                                        ))}
                                    </VStack>
                                </Box>
                            )}

                            {/* Empty State */}
                            {questions.length === 0 && (
                                <Text textAlign="center" color="gray.500" py={4}>
                                    No questions available
                                </Text>
                            )}
                        </VStack>

                        <Box p={4} borderTop="1px solid" borderColor="gray.200">
                            <Button
                                onClick={handleSubmit}
                                colorScheme="blue"
                                size="lg"
                                width="100%"
                                leftIcon={<FaCheck />}
                                disabled={isPending || isFinished || timeLeft <= 0}
                            >
                                Submit Test
                            </Button>
                        </Box>
                    </Card>
                </VStack>
            </Container>
        </MainTemPlate>
    );
};

export default ExamDetail;