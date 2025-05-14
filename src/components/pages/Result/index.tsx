import {
    Box,
    Flex,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    // Badge,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
} from "@chakra-ui/react";
import MainTemPlate from "../../templates/MainTemPlate";
import { useParams } from "react-router-dom";
import { useGetHistory } from "../../../services/history/get-history";
import { useMemo } from "react";

const Result = () => {
    const { id } = useParams();

    const { data } = useGetHistory({ id: Number(id) });
    const score = useMemo(
        () => (data?.data?.score ? JSON.parse(data?.data?.score) : ""),
        [data]
    );

    // const scorePercentage = useMemo(
    //     () =>
    //         score
    //             ? Number(
    //                   (
    //                       Number(score.split("/")[0]) /
    //                       Number(score.split("/")[1])
    //                   ).toFixed(0)
    //               ) * 100
    //             : "",
    //     [score]
    // );

    // const getScoreColor = (percentage: number) => {
    //     if (percentage < 50) return "red";
    //     if (percentage < 70) return "yellow";
    //     if (percentage < 90) return "blue";
    //     return "green";
    // };

    // const scoreColor = getScoreColor(scorePercentage);

    return (
        <MainTemPlate>
            <Box maxW="1200px" mx="auto" p={6}>
                <Flex justifyContent="space-between" alignItems="center" mb={6}>
                    <Heading size="xl">Test Results</Heading>
                </Flex>

                <Card mb={6} variant="outline">
                    <CardHeader pb={2}>
                        <Heading size="md">
                            {data?.data?.Exam?.title || ""}
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            <Stat>
                                <StatLabel>Score</StatLabel>
                                <StatNumber>{score}</StatNumber>
                                {/* <StatHelpText>{scorePercentage}%</StatHelpText> */}
                                {/* <Progress
                                    value={scorePercentage}
                                    colorScheme={scoreColor}
                                    mt={2}
                                    borderRadius="md"
                                /> */}
                            </Stat>

                            <Stat>
                                <StatLabel>Completion Time</StatLabel>
                                <StatNumber>120p</StatNumber>
                                <StatHelpText>minutes</StatHelpText>
                            </Stat>

                            <Stat>
                                <StatLabel>Date Completed</StatLabel>
                                <StatNumber>
                                    {data?.data?.created_at.split("T")[0]}
                                </StatNumber>
                            </Stat>
                        </SimpleGrid>

                        {/* <Box mt={4}>
                            <Badge
                                colorScheme={scoreColor}
                                fontSize="md"
                                py={1}
                                px={3}
                                borderRadius="full"
                            >
                                {scorePercentage >= 70 ? "PASSED" : "FAILED"}
                            </Badge>
                        </Box> */}
                    </CardBody>
                </Card>
            </Box>
        </MainTemPlate>
    );
};

export default Result;
