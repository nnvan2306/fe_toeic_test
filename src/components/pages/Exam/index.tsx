import React, { useMemo } from "react";
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
import { useGetExams } from "../../../services/exam/get-exams";
import { useGetHistories } from "../../../services/history/get-by-user";
import { useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";

const Exam: React.FC = () => {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.user);
    const { data } = useGetExams({});
    const exams = useMemo(
        () =>
            (data?.data || []).map((item: ExamResponseType) => ({
                ...item,
                duration: 25,
                questions: JSON.parse(item?.questions)?.length || 0,
            })),
        [data]
    );

    const { data: examOld } = useGetHistories({ id: user?.id || 0 });
    const old = useMemo(() => {
        const list = (examOld?.data || []).map((item) => item.examId);

        const result = (data?.data || []).filter((item) =>
            list.some((examId) => examId === item.id)
        );
        return result.length;
    }, [examOld, data]);

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
                            <Text fontWeight="bold">{t("exam.chart")}</Text>
                            {/* <Text fontSize="sm" color="gray.600">
                                Tiến độ của bạn
                            </Text> */}
                        </Box>
                    </HStack>

                    <HStack spacing={8} wrap="wrap">
                        <VStack spacing={0} align="flex-start">
                            <Text fontSize="sm" color="gray.600">
                                {t("exam.completed")}
                            </Text>
                            <Text fontWeight="bold" fontSize="xl">
                                {old}
                            </Text>
                        </VStack>

                        <VStack spacing={0} align="flex-start">
                            <Text fontSize="sm" color="gray.600">
                                {t("exam.noCompleted")}
                            </Text>
                            <Text fontWeight="bold" fontSize="xl">
                                {data?.data?.length - old}
                            </Text>
                        </VStack>
                    </HStack>
                </Flex>

                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={6}
                >
                    {exams.map((exam: ExamResponseType) => (
                        <ExamCard key={exam.id} exam={exam} />
                    ))}
                </SimpleGrid>

                {/* <Flex justify="center" mt={10}>
                    <Button variant="outline" size="md">
                        Xem thêm bài kiểm tra
                    </Button>
                </Flex> */}
            </Box>
        </MainTemPlate>
    );
};

export default Exam;

type ExamCardProps = {
    exam: ExamResponseType;
};

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
    const { t } = useTranslation();

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
                            {/* <Text fontSize="xs">{exam.time} phút</Text> */}
                            <Text fontSize="xs">120 phút</Text>
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
                    {t("exam.button")}
                </Button>
            </CardFooter>
        </Card>
    );
};
