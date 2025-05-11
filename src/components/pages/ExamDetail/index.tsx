import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    Radio,
    RadioGroup,
    Stack,
    Badge,
    useToast,
    Progress,
    Card,
    CardHeader,
    CardBody,
    Divider,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import {
    FaCheck,
    FaClock,
    FaRegLightbulb,
    FaMedal,
    FaHeadphones,
    FaLanguage,
    FaBook,
    FaPencilAlt,
    FaGlobe,
} from "react-icons/fa";
import MainTemPlate from "../../templates/MainTemPlate";

interface MultipleChoiceQuestion {
    id: number;
    type: "multiple-choice";
    text: string;
    options: string[];
    correctAnswer: number;
}

interface ListeningQuestion {
    id: number;
    type: "listening";
    audioSrc: string;
    text: string;
    options: string[];
    correctAnswer: number;
}

const mockGrammarQuestions: MultipleChoiceQuestion[] = [
    {
        id: 1,
        type: "multiple-choice",
        text: "She _____ to the store yesterday.",
        options: ["go", "goes", "went", "gone"],
        correctAnswer: 2,
    },
    {
        id: 2,
        type: "multiple-choice",
        text: "If it _____ tomorrow, we will cancel the picnic.",
        options: ["rains", "will rain", "is raining", "rain"],
        correctAnswer: 0,
    },
    {
        id: 3,
        type: "multiple-choice",
        text: "By the time we arrived, the movie _____.",
        options: [
            "already started",
            "has already started",
            "had already started",
            "was already starting",
        ],
        correctAnswer: 2,
    },
];

const mockVocabularyQuestions: MultipleChoiceQuestion[] = [
    {
        id: 1,
        type: "multiple-choice",
        text: "What is the meaning of 'arbitrary'?",
        options: [
            "Based on random choice or personal whim",
            "Difficult to understand",
            "Ancient and traditional",
            "Relating to trees",
        ],
        correctAnswer: 0,
    },
    {
        id: 2,
        type: "multiple-choice",
        text: "Choose the word closest in meaning to 'benevolent'.",
        options: ["Hostile", "Intelligent", "Kind", "Powerful"],
        correctAnswer: 2,
    },
    {
        id: 3,
        type: "multiple-choice",
        text: "Which word is an antonym of 'conceal'?",
        options: ["Hide", "Reveal", "Cover", "Disguise"],
        correctAnswer: 1,
    },
];

const mockReadingComprehension = {
    passage: `The Internet is a global network connecting millions of computers. More than 190 countries are linked into exchanges of data, news and opinions. According to Internet World Stats, as of December 31, 2021, there were 5,168,780,607 Internet users worldwide. The Internet has revolutionized the computer and communications world like nothing before.

The Internet has given us immediate access to a vast array of information and knowledge. It has also provided unique opportunities for people across the world to connect with one another, regardless of geographical location. The invention and development of the Internet has undoubtedly been one of the most significant technological advances of the twentieth century.`,

    questions: [
        {
            id: 1,
            type: "multiple-choice" as const,
            text: "According to the passage, how many Internet users were there worldwide as of December 31, 2021?",
            options: [
                "About 190 million",
                "About 5.1 billion",
                "About 4.7 billion",
                "The passage doesn't specify",
            ],
            correctAnswer: 1,
        },
        {
            id: 2,
            type: "multiple-choice" as const,
            text: "What is the main point of the second paragraph?",
            options: [
                "The Internet has made communications more difficult",
                "The Internet is only useful for research",
                "The Internet has enabled global access to information and connection",
                "The Internet was invented in the twenty-first century",
            ],
            correctAnswer: 2,
        },
        {
            id: 3,
            type: "multiple-choice" as const,
            text: "The word 'revolutionized' in the first paragraph is closest in meaning to:",
            options: [
                "Destroyed",
                "Transformed radically",
                "Slightly changed",
                "Controlled",
            ],
            correctAnswer: 1,
        },
    ],
};

const mockListeningQuestions: ListeningQuestion[] = [
    {
        id: 1,
        type: "listening",
        audioSrc: "/audio/listening1.mp3", // This would be a real audio file path in a real app
        text: "What does the woman suggest they do?",
        options: [
            "Go to a restaurant",
            "Cook dinner at home",
            "Order takeout",
            "Visit friends",
        ],
        correctAnswer: 2,
    },
    {
        id: 2,
        type: "listening",
        audioSrc: "/audio/listening2.mp3", // This would be a real audio file path in a real app
        text: "Where is the meeting going to be held?",
        options: [
            "In the main conference room",
            "In the manager's office",
            "In the cafeteria",
            "In room 302",
        ],
        correctAnswer: 3,
    },
];

// Type for each section's answers
interface SectionAnswers {
    grammar: number[];
    vocabulary: number[];
    reading: number[];
    listening: number[];
}

const ExamDetail: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("grammar");
    const [answers, setAnswers] = useState<SectionAnswers>({
        grammar: Array(mockGrammarQuestions.length).fill(-1),
        vocabulary: Array(mockVocabularyQuestions.length).fill(-1),
        reading: Array(mockReadingComprehension.questions.length).fill(-1),
        listening: Array(mockListeningQuestions.length).fill(-1),
    });

    const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const toast = useToast();

    const getSectionProgress = (section: string) => {
        const sectionAnswers = answers[section as keyof SectionAnswers];
        return sectionAnswers
            ? sectionAnswers.filter((a) => a !== -1).length /
                  sectionAnswers.length
            : 0;
    };

    const getOverallProgress = () => {
        const totalQuestions =
            mockGrammarQuestions.length +
            mockVocabularyQuestions.length +
            mockReadingComprehension.questions.length +
            mockListeningQuestions.length;

        const answeredQuestions =
            answers.grammar.filter((a) => a !== -1).length +
            answers.vocabulary.filter((a) => a !== -1).length +
            answers.reading.filter((a) => a !== -1).length +
            answers.listening.filter((a) => a !== -1).length;

        return answeredQuestions / totalQuestions;
    };

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

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
        const sectionKey = activeSection as keyof SectionAnswers;
        const newAnswers = { ...answers };
        const sectionAnswers = [...newAnswers[sectionKey]];
        sectionAnswers[questionIndex] = answerIndex;
        newAnswers[sectionKey] = sectionAnswers;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const allSections = ["grammar", "vocabulary", "reading", "listening"];
        let unansweredSections: string[] = [];

        allSections.forEach((section) => {
            const sectionKey = section as keyof SectionAnswers;
            if (answers[sectionKey].includes(-1)) {
                unansweredSections.push(section);
            }
        });

        if (unansweredSections.length > 0) {
            toast({
                title: "Chưa hoàn thành",
                description: `Bạn chưa trả lời hết các câu hỏi trong phần: ${unansweredSections.join(
                    ", "
                )}!`,
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsFinished(true);
        setShowResults(true);
    };

    const calculateScore = () => {
        let correctCount = 0;
        let totalQuestions = 0;

        mockGrammarQuestions.forEach((_, idx) => {
            if (
                answers.grammar[idx] === mockGrammarQuestions[idx].correctAnswer
            ) {
                correctCount++;
            }
            totalQuestions++;
        });

        mockVocabularyQuestions.forEach((_, idx) => {
            if (
                answers.vocabulary[idx] ===
                mockVocabularyQuestions[idx].correctAnswer
            ) {
                correctCount++;
            }
            totalQuestions++;
        });

        mockReadingComprehension.questions.forEach((_, idx) => {
            if (
                answers.reading[idx] ===
                mockReadingComprehension.questions[idx].correctAnswer
            ) {
                correctCount++;
            }
            totalQuestions++;
        });

        mockListeningQuestions.forEach((_, idx) => {
            if (
                answers.listening[idx] ===
                mockListeningQuestions[idx].correctAnswer
            ) {
                correctCount++;
            }
            totalQuestions++;
        });

        return {
            correct: correctCount,
            total: totalQuestions,
            percentage: (correctCount / totalQuestions) * 100,
        };
    };

    const renderResults = () => {
        const score = calculateScore();

        const sectionScores = {
            grammar: mockGrammarQuestions.filter(
                (_, idx) =>
                    answers.grammar[idx] ===
                    mockGrammarQuestions[idx].correctAnswer
            ).length,
            vocabulary: mockVocabularyQuestions.filter(
                (_, idx) =>
                    answers.vocabulary[idx] ===
                    mockVocabularyQuestions[idx].correctAnswer
            ).length,
            reading: mockReadingComprehension.questions.filter(
                (_, idx) =>
                    answers.reading[idx] ===
                    mockReadingComprehension.questions[idx].correctAnswer
            ).length,
            listening: mockListeningQuestions.filter(
                (_, idx) =>
                    answers.listening[idx] ===
                    mockListeningQuestions[idx].correctAnswer
            ).length,
        };

        return (
            <Card variant="outline" w="100%" boxShadow="md">
                <CardHeader bg="blue.50" borderTopRadius="md">
                    <Flex align="center">
                        <FaMedal
                            size={24}
                            style={{ marginRight: "12px", color: "#F6AD55" }}
                        />
                        <Heading size="lg">English Test Results</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} align="stretch">
                        <Box bg="blue.50" p={4} borderRadius="md">
                            <Heading
                                size="md"
                                mb={4}
                                display="flex"
                                alignItems="center"
                            >
                                <FaMedal
                                    style={{
                                        marginRight: "10px",
                                        color:
                                            score.percentage >= 80
                                                ? "#38A169"
                                                : score.percentage >= 60
                                                ? "#3182CE"
                                                : "#E53E3E",
                                    }}
                                />
                                Overall Score: {score.correct}/{score.total} (
                                {score.percentage.toFixed(0)}%)
                            </Heading>
                            <Progress
                                value={score.percentage}
                                colorScheme={
                                    score.percentage >= 80
                                        ? "green"
                                        : score.percentage >= 60
                                        ? "blue"
                                        : "red"
                                }
                                size="md"
                                borderRadius="md"
                                mb={2}
                            />
                            <Text mt={2} fontStyle="italic">
                                {score.percentage >= 80
                                    ? "Excellent! You have a strong command of English."
                                    : score.percentage >= 60
                                    ? "Good job! You have a solid understanding of English."
                                    : "You should continue practicing to improve your English skills."}
                            </Text>
                        </Box>

                        <Divider />

                        <Heading size="md" mb={3}>
                            Section Scores
                        </Heading>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem>
                                <Card p={3} bg="cyan.50">
                                    <Flex align="center" mb={2}>
                                        <FaBook
                                            style={{ marginRight: "8px" }}
                                        />
                                        <Heading size="sm">Grammar</Heading>
                                    </Flex>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {sectionScores.grammar}/
                                        {mockGrammarQuestions.length}
                                    </Text>
                                    <Progress
                                        value={
                                            (sectionScores.grammar /
                                                mockGrammarQuestions.length) *
                                            100
                                        }
                                        colorScheme="cyan"
                                        size="sm"
                                        mt={2}
                                    />
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card p={3} bg="purple.50">
                                    <Flex align="center" mb={2}>
                                        <FaLanguage
                                            style={{ marginRight: "8px" }}
                                        />
                                        <Heading size="sm">Vocabulary</Heading>
                                    </Flex>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {sectionScores.vocabulary}/
                                        {mockVocabularyQuestions.length}
                                    </Text>
                                    <Progress
                                        value={
                                            (sectionScores.vocabulary /
                                                mockVocabularyQuestions.length) *
                                            100
                                        }
                                        colorScheme="purple"
                                        size="sm"
                                        mt={2}
                                    />
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card p={3} bg="green.50">
                                    <Flex align="center" mb={2}>
                                        <FaBook
                                            style={{ marginRight: "8px" }}
                                        />
                                        <Heading size="sm">Reading</Heading>
                                    </Flex>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {sectionScores.reading}/
                                        {
                                            mockReadingComprehension.questions
                                                .length
                                        }
                                    </Text>
                                    <Progress
                                        value={
                                            (sectionScores.reading /
                                                mockReadingComprehension
                                                    .questions.length) *
                                            100
                                        }
                                        colorScheme="green"
                                        size="sm"
                                        mt={2}
                                    />
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card p={3} bg="orange.50">
                                    <Flex align="center" mb={2}>
                                        <FaHeadphones
                                            style={{ marginRight: "8px" }}
                                        />
                                        <Heading size="sm">Listening</Heading>
                                    </Flex>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {sectionScores.listening}/
                                        {mockListeningQuestions.length}
                                    </Text>
                                    <Progress
                                        value={
                                            (sectionScores.listening /
                                                mockListeningQuestions.length) *
                                            100
                                        }
                                        colorScheme="orange"
                                        size="sm"
                                        mt={2}
                                    />
                                </Card>
                            </GridItem>
                        </Grid>

                        <Divider my={2} />

                        <Box>
                            <Heading
                                size="sm"
                                mb={3}
                                display="flex"
                                alignItems="center"
                            >
                                <FaRegLightbulb
                                    style={{
                                        marginRight: "8px",
                                        color: "#F6AD55",
                                    }}
                                />
                                Suggestions for Improvement
                            </Heading>
                            <VStack align="stretch" spacing={2}>
                                {sectionScores.grammar <
                                    mockGrammarQuestions.length && (
                                    <Text>
                                        • Focus on improving your understanding
                                        of English grammar rules.
                                    </Text>
                                )}
                                {sectionScores.vocabulary <
                                    mockVocabularyQuestions.length && (
                                    <Text>
                                        • Expand your vocabulary by reading more
                                        English texts and practicing new words.
                                    </Text>
                                )}
                                {sectionScores.reading <
                                    mockReadingComprehension.questions
                                        .length && (
                                    <Text>
                                        • Practice your reading comprehension
                                        skills with various English articles.
                                    </Text>
                                )}
                                {sectionScores.listening <
                                    mockListeningQuestions.length && (
                                    <Text>
                                        • Improve your listening skills by
                                        watching English videos or listening to
                                        podcasts.
                                    </Text>
                                )}
                                {Object.values(sectionScores).every(
                                    (score) =>
                                        score === mockGrammarQuestions.length
                                ) && (
                                    <Text>
                                        • Excellent work! Continue practicing to
                                        maintain your English proficiency.
                                    </Text>
                                )}
                            </VStack>
                        </Box>

                        <Button
                            colorScheme="blue"
                            mt={2}
                            onClick={() => window.location.reload()}
                            leftIcon={<FaRegLightbulb />}
                        >
                            Take Another Test
                        </Button>
                    </VStack>
                </CardBody>
            </Card>
        );
    };

    const renderExamSections = () => {
        return (
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
                        value={getOverallProgress() * 100}
                        colorScheme="blue"
                        size="sm"
                        borderRadius="md"
                        mb={4}
                    />
                    <Flex justify="space-between" mb={4}>
                        <Text fontWeight="medium">Overall Progress</Text>
                        <Text>{Math.round(getOverallProgress() * 100)}%</Text>
                    </Flex>
                </Box>

                <Tabs
                    isFitted
                    variant="enclosed"
                    onChange={(index) => {
                        const sections = [
                            "grammar",
                            "vocabulary",
                            "reading",
                            "listening",
                        ];
                        setActiveSection(sections[index]);
                    }}
                >
                    <TabList mb="1em">
                        <Tab>
                            <Flex align="center" direction="column">
                                <FaBook />
                                <Text mt={1}>Grammar</Text>
                                <Badge
                                    colorScheme={
                                        getSectionProgress("grammar") === 1
                                            ? "green"
                                            : "gray"
                                    }
                                    mt={1}
                                >
                                    {
                                        answers.grammar.filter((a) => a !== -1)
                                            .length
                                    }
                                    /{mockGrammarQuestions.length}
                                </Badge>
                            </Flex>
                        </Tab>
                        <Tab>
                            <Flex align="center" direction="column">
                                <FaLanguage />
                                <Text mt={1}>Vocabulary</Text>
                                <Badge
                                    colorScheme={
                                        getSectionProgress("vocabulary") === 1
                                            ? "green"
                                            : "gray"
                                    }
                                    mt={1}
                                >
                                    {
                                        answers.vocabulary.filter(
                                            (a) => a !== -1
                                        ).length
                                    }
                                    /{mockVocabularyQuestions.length}
                                </Badge>
                            </Flex>
                        </Tab>
                        <Tab>
                            <Flex align="center" direction="column">
                                <FaPencilAlt />
                                <Text mt={1}>Reading</Text>
                                <Badge
                                    colorScheme={
                                        getSectionProgress("reading") === 1
                                            ? "green"
                                            : "gray"
                                    }
                                    mt={1}
                                >
                                    {
                                        answers.reading.filter((a) => a !== -1)
                                            .length
                                    }
                                    /{mockReadingComprehension.questions.length}
                                </Badge>
                            </Flex>
                        </Tab>
                        <Tab>
                            <Flex align="center" direction="column">
                                <FaHeadphones />
                                <Text mt={1}>Listening</Text>
                                <Badge
                                    colorScheme={
                                        getSectionProgress("listening") === 1
                                            ? "green"
                                            : "gray"
                                    }
                                    mt={1}
                                >
                                    {
                                        answers.listening.filter(
                                            (a) => a !== -1
                                        ).length
                                    }
                                    /{mockListeningQuestions.length}
                                </Badge>
                            </Flex>
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <VStack spacing={6} align="stretch">
                                {mockGrammarQuestions.map(
                                    (question, qIndex) => (
                                        <Card
                                            key={question.id}
                                            variant="outline"
                                            p={4}
                                        >
                                            <Text fontWeight="bold" mb={3}>
                                                {qIndex + 1}. {question.text}
                                            </Text>
                                            <RadioGroup
                                                onChange={(value) =>
                                                    handleSelectAnswer(
                                                        qIndex,
                                                        parseInt(value)
                                                    )
                                                }
                                                value={answers.grammar[
                                                    qIndex
                                                ].toString()}
                                                colorScheme="blue"
                                            >
                                                <Stack spacing={3}>
                                                    {question.options.map(
                                                        (option, oIndex) => (
                                                            <Radio
                                                                key={oIndex}
                                                                value={oIndex.toString()}
                                                                size="md"
                                                            >
                                                                <Text>
                                                                    {option}
                                                                </Text>
                                                            </Radio>
                                                        )
                                                    )}
                                                </Stack>
                                            </RadioGroup>
                                        </Card>
                                    )
                                )}
                            </VStack>
                        </TabPanel>

                        <TabPanel>
                            <VStack spacing={6} align="stretch">
                                {mockVocabularyQuestions.map(
                                    (question, qIndex) => (
                                        <Card
                                            key={question.id}
                                            variant="outline"
                                            p={4}
                                        >
                                            <Text fontWeight="bold" mb={3}>
                                                {qIndex + 1}. {question.text}
                                            </Text>
                                            <RadioGroup
                                                onChange={(value) =>
                                                    handleSelectAnswer(
                                                        qIndex,
                                                        parseInt(value)
                                                    )
                                                }
                                                value={answers.vocabulary[
                                                    qIndex
                                                ].toString()}
                                                colorScheme="purple"
                                            >
                                                <Stack spacing={3}>
                                                    {question.options.map(
                                                        (option, oIndex) => (
                                                            <Radio
                                                                key={oIndex}
                                                                value={oIndex.toString()}
                                                                size="md"
                                                            >
                                                                <Text>
                                                                    {option}
                                                                </Text>
                                                            </Radio>
                                                        )
                                                    )}
                                                </Stack>
                                            </RadioGroup>
                                        </Card>
                                    )
                                )}
                            </VStack>
                        </TabPanel>

                        <TabPanel>
                            <VStack spacing={6} align="stretch">
                                <Card variant="outline" p={4} bg="gray.50">
                                    <Heading size="sm" mb={2}>
                                        Reading Passage
                                    </Heading>
                                    <Text>
                                        {mockReadingComprehension.passage}
                                    </Text>
                                </Card>

                                {mockReadingComprehension.questions.map(
                                    (question, qIndex) => (
                                        <Card
                                            key={question.id}
                                            variant="outline"
                                            p={4}
                                        >
                                            <Text fontWeight="bold" mb={3}>
                                                {qIndex + 1}. {question.text}
                                            </Text>
                                            <RadioGroup
                                                onChange={(value) =>
                                                    handleSelectAnswer(
                                                        qIndex,
                                                        parseInt(value)
                                                    )
                                                }
                                                value={answers.reading[
                                                    qIndex
                                                ].toString()}
                                                colorScheme="green"
                                            >
                                                <Stack spacing={3}>
                                                    {question.options.map(
                                                        (option, oIndex) => (
                                                            <Radio
                                                                key={oIndex}
                                                                value={oIndex.toString()}
                                                                size="md"
                                                            >
                                                                <Text>
                                                                    {option}
                                                                </Text>
                                                            </Radio>
                                                        )
                                                    )}
                                                </Stack>
                                            </RadioGroup>
                                        </Card>
                                    )
                                )}
                            </VStack>
                        </TabPanel>

                        <TabPanel>
                            <VStack spacing={6} align="stretch">
                                {mockListeningQuestions.map(
                                    (question, qIndex) => (
                                        <Card
                                            key={question.id}
                                            variant="outline"
                                            p={4}
                                        >
                                            <VStack align="stretch" spacing={3}>
                                                <Flex align="center">
                                                    <FaHeadphones
                                                        size={18}
                                                        style={{
                                                            marginRight: "8px",
                                                        }}
                                                    />
                                                    <Text fontWeight="bold">
                                                        Audio {qIndex + 1}
                                                    </Text>
                                                </Flex>

                                                <Box
                                                    bg="gray.100"
                                                    p={3}
                                                    borderRadius="md"
                                                    textAlign="center"
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <FaHeadphones />
                                                        }
                                                        colorScheme="orange"
                                                        size="sm"
                                                    >
                                                        Play Audio
                                                    </Button>
                                                    <Text
                                                        fontSize="sm"
                                                        mt={2}
                                                        color="gray.600"
                                                    >
                                                        Click to play the audio
                                                        (In a real app, this
                                                        would play actual audio)
                                                    </Text>
                                                </Box>

                                                <Text fontWeight="bold" mt={2}>
                                                    {qIndex + 1}.{" "}
                                                    {question.text}
                                                </Text>

                                                <RadioGroup
                                                    onChange={(value) =>
                                                        handleSelectAnswer(
                                                            qIndex,
                                                            parseInt(value)
                                                        )
                                                    }
                                                    value={answers.listening[
                                                        qIndex
                                                    ].toString()}
                                                    colorScheme="orange"
                                                >
                                                    <Stack spacing={3}>
                                                        {question.options.map(
                                                            (
                                                                option,
                                                                oIndex
                                                            ) => (
                                                                <Radio
                                                                    key={oIndex}
                                                                    value={oIndex.toString()}
                                                                    size="md"
                                                                >
                                                                    <Text>
                                                                        {option}
                                                                    </Text>
                                                                </Radio>
                                                            )
                                                        )}
                                                    </Stack>
                                                </RadioGroup>
                                            </VStack>
                                        </Card>
                                    )
                                )}
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Box p={4} borderTop="1px solid" borderColor="gray.200">
                    <Button
                        onClick={handleSubmit}
                        colorScheme="blue"
                        size="lg"
                        width="100%"
                        leftIcon={<FaCheck />}
                    >
                        Submit Test
                    </Button>
                </Box>
            </Card>
        );
    };

    return (
        <MainTemPlate>
            <Container maxW="container.lg" py={8}>
                <VStack spacing={6} align="stretch">
                    {showResults ? renderResults() : renderExamSections()}
                </VStack>
            </Container>
        </MainTemPlate>
    );
};

export default ExamDetail;
