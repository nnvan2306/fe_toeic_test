import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Icon,
    HStack,
    VStack,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Image,
} from "@chakra-ui/react";
import { FiClock, FiBookOpen, FiBarChart2, FiArrowRight } from "react-icons/fi";
import MainTemPlate from "../../templates/MainTemPlate";
import { ExamResponseType } from "../../../types/exam";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import toeic from "../../../../public/toeic.jpg";

const examData: ExamResponseType[] = [
    {
        id: 1,
        title: "ETS TOEIC 2023 - Test 1",
        description: "Đề thi chính thức từ ETS năm 2023",
        duration: 120,
        questions: 200,
    },
    {
        id: 2,
        title: "TOEIC Listening Practice",
        description: "Luyện tập kỹ năng nghe với 50 câu hỏi",
        duration: 45,
        questions: 50,
    },
    {
        id: 3,
        title: "TOEIC Reading Comprehension",
        description: "Nâng cao kỹ năng đọc hiểu",
        duration: 60,
        questions: 50,
    },
    {
        id: 4,
        title: "ETS TOEIC 2023 - Test 2",
        description: "Đề thi chính thức từ ETS năm 2023",
        duration: 120,
        questions: 200,
    },
    {
        id: 5,
        title: "Business Vocabulary Test",
        description: "Kiểm tra từ vựng trong môi trường doanh nghiệp",
        duration: 30,
        questions: 40,
    },
    {
        id: 6,
        title: "Grammar Challenge",
        description: "Thử thách ngữ pháp tiếng Anh cơ bản và nâng cao",
        duration: 25,
        questions: 30,
    },
];

const Exam: React.FC = () => {
    return (
        <MainTemPlate>
            <Box w="100%">
                <Flex
                    mb={8}
                    p={4}
                    bg="blue.50"
                    borderRadius="lg"
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap={4}
                >
                    <HStack>
                        <Icon as={FiBarChart2} boxSize={6} color="blue.500" />
                        <Box>
                            <Text fontWeight="bold">Thống kê học tập</Text>
                            <Text fontSize="sm" color="gray.600">
                                Tiến độ của bạn
                            </Text>
                        </Box>
                    </HStack>

                    <HStack spacing={8} wrap="wrap">
                        <VStack spacing={0} align="flex-start">
                            <Text fontSize="sm" color="gray.600">
                                Đã hoàn thành
                            </Text>
                            <Text fontWeight="bold" fontSize="xl">
                                1
                            </Text>
                        </VStack>

                        <VStack spacing={0} align="flex-start">
                            <Text fontSize="sm" color="gray.600">
                                Đang làm
                            </Text>
                            <Text fontWeight="bold" fontSize="xl">
                                2
                            </Text>
                        </VStack>

                        <VStack spacing={0} align="flex-start">
                            <Text fontSize="sm" color="gray.600">
                                Chưa bắt đầu
                            </Text>
                            <Text fontWeight="bold" fontSize="xl">
                                3
                            </Text>
                        </VStack>
                    </HStack>
                </Flex>

                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={6}
                >
                    {examData.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} />
                    ))}
                </SimpleGrid>

                <Flex justify="center" mt={10}>
                    <Button variant="outline" size="md">
                        Xem thêm bài kiểm tra
                    </Button>
                </Flex>
            </Box>
        </MainTemPlate>
    );
};

export default Exam;

type ExamCardProps = {
    exam: ExamResponseType;
};

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
    const navigate = useNavigate();
    return (
        <Card
            overflow="hidden"
            variant="outline"
            borderRadius="lg"
            boxShadow="sm"
        >
            <Image
                src={toeic}
                alt={exam.title}
                objectFit="cover"
                height="150px"
            />

            <CardBody pt={3} pb={2}>
                <Stack spacing={2}>
                    <Heading size="md" fontWeight="bold" noOfLines={1}>
                        {exam.title}
                    </Heading>

                    <Text fontSize="sm" color="gray.500" noOfLines={2}>
                        {exam.description}
                    </Text>

                    <HStack spacing={4} mt={1}>
                        <Flex align="center">
                            <Icon as={FiClock} mr={1} color="gray.500" />
                            <Text fontSize="xs">{exam.duration} phút</Text>
                        </Flex>
                        <Flex align="center">
                            <Icon as={FiBookOpen} mr={1} color="gray.500" />
                            <Text fontSize="xs">{exam.questions} câu hỏi</Text>
                        </Flex>
                    </HStack>
                </Stack>
            </CardBody>

            <CardFooter pt={0} pb={3}>
                <Button
                    rightIcon={<FiArrowRight />}
                    colorScheme="blue"
                    variant={"solid"}
                    size="sm"
                    width="full"
                    onClick={() =>
                        navigate(
                            routesMap.ExamDetail.replace("/:id", `/${exam.id}`)
                        )
                    }
                >
                    Bắt đầu
                </Button>
            </CardFooter>
        </Card>
    );
};
