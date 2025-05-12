import React, { useState, useEffect, useMemo } from "react";
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
    Card,
    CardHeader,
    Flex,
    Image,
    Progress,
} from "@chakra-ui/react";
import { FaCheck, FaClock, FaHeadphones, FaGlobe } from "react-icons/fa";
import MainTemPlate from "../../templates/MainTemPlate";
import { useGetExam } from "../../../services/exam/get-exam";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionType } from "../ExamNew";
import { useCreateHistory } from "../../../services/history/create";
import { useAppSelector } from "../../../app/hooks";
import { getAxiosError } from "../../../libs/axios";
import toast from "../../../libs/toast";
import { routesMap } from "../../../routes/routes";

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

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleSelectAnswer = (questionIndex: number, answerUuid: string) => {
        const updated = questions.map((q, i) => {
            if (i !== questionIndex) return q;
            return {
                ...q,
                answers: q.answers.map((ans) => ({
                    ...ans,
                    isChoose: ans.uuid === answerUuid,
                })),
            };
        });
        if (!questions[questionIndex].answers.find((item) => item.isChoose)) {
            setCount(count + 1);
        }
        setQuestions(updated);
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
                                value={(count / questions.length) * 100}
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
                                    {Math.round(
                                        (count / questions.length) * 100
                                    )}
                                    %
                                </Text>
                            </Flex>
                        </Box>
                        <VStack w="100%" px={4} gap={4}>
                            {questions?.length
                                ? questions.map(
                                      (item: QuestionType, index: number) => {
                                          //   if (item.audio) {
                                          //       return (
                                          //           <Card
                                          //               key={item.uuid}
                                          //               variant="outline"
                                          //               p={4}
                                          //               w="100%"
                                          //           >
                                          //               <VStack
                                          //                   align="stretch"
                                          //                   spacing={3}
                                          //               >
                                          //                   <Flex align="center">
                                          //                       <FaHeadphones
                                          //                           size={18}
                                          //                           style={{
                                          //                               marginRight:
                                          //                                   "8px",
                                          //                           }}
                                          //                       />
                                          //                       <Text fontWeight="bold">
                                          //                           {index + 1}.{" "}
                                          //                           {item.title}
                                          //                       </Text>
                                          //                   </Flex>

                                          //                   <Box
                                          //                       bg="gray.100"
                                          //                       p={3}
                                          //                       borderRadius="md"
                                          //                       textAlign="center"
                                          //                   >
                                          //                       <audio
                                          //                           controls
                                          //                           style={{
                                          //                               width: "100%",
                                          //                           }}
                                          //                       >
                                          //                           <source
                                          //                               src={
                                          //                                   item.audio
                                          //                               }
                                          //                               type="audio/ogg"
                                          //                           />
                                          //                           <source
                                          //                               src={
                                          //                                   item.audio
                                          //                               }
                                          //                               type="audio/mpeg"
                                          //                           />
                                          //                       </audio>
                                          //                   </Box>

                                          //                   <RadioGroup
                                          //                       onChange={(val) =>
                                          //                           handleSelectAnswer(
                                          //                               index,
                                          //                               val
                                          //                           )
                                          //                       }
                                          //                       value={
                                          //                           item.answers.find(
                                          //                               (a) =>
                                          //                                   a.isChoose
                                          //                           )?.uuid || ""
                                          //                       }
                                          //                   >
                                          //                       <Stack
                                          //                           spacing={3}
                                          //                       >
                                          //                           {item.answers.map(
                                          //                               (
                                          //                                   option
                                          //                               ) => (
                                          //                                   <Radio
                                          //                                       key={
                                          //                                           option.uuid
                                          //                                       }
                                          //                                       value={
                                          //                                           option.uuid
                                          //                                       }
                                          //                                   >
                                          //                                       {
                                          //                                           option.content
                                          //                                       }
                                          //                                   </Radio>
                                          //                               )
                                          //                           )}
                                          //                       </Stack>
                                          //                   </RadioGroup>
                                          //               </VStack>
                                          //           </Card>
                                          //       );
                                          //   }
                                          //   if (item.image) {
                                          //       return (
                                          //           <Card
                                          //               key={item.uuid}
                                          //               variant="outline"
                                          //               p={4}
                                          //               w="100%"
                                          //           >
                                          //               <VStack
                                          //                   align="stretch"
                                          //                   spacing={3}
                                          //               >
                                          //                   <Flex align="center">
                                          //                       <FaHeadphones
                                          //                           size={18}
                                          //                           style={{
                                          //                               marginRight:
                                          //                                   "8px",
                                          //                           }}
                                          //                       />
                                          //                       <Text fontWeight="bold">
                                          //                           {index + 1}.{" "}
                                          //                           {item.title}
                                          //                       </Text>
                                          //                   </Flex>

                                          //                   <Box
                                          //                       bg="gray.100"
                                          //                       p={3}
                                          //                       borderRadius="md"
                                          //                       textAlign="center"
                                          //                   >
                                          //                       <Image
                                          //                           alt="image"
                                          //                           src={
                                          //                               item.image
                                          //                           }
                                          //                       />
                                          //                   </Box>
                                          //                   <RadioGroup
                                          //                       onChange={(val) =>
                                          //                           handleSelectAnswer(
                                          //                               index,
                                          //                               val
                                          //                           )
                                          //                       }
                                          //                       value={
                                          //                           item.answers.find(
                                          //                               (a) =>
                                          //                                   a.isChoose
                                          //                           )?.uuid || ""
                                          //                       }
                                          //                   >
                                          //                       <Stack
                                          //                           spacing={3}
                                          //                       >
                                          //                           {item.answers.map(
                                          //                               (
                                          //                                   option
                                          //                               ) => (
                                          //                                   <Radio
                                          //                                       key={
                                          //                                           option.uuid
                                          //                                       }
                                          //                                       value={
                                          //                                           option.uuid
                                          //                                       }
                                          //                                   >
                                          //                                       {
                                          //                                           option.content
                                          //                                       }
                                          //                                   </Radio>
                                          //                               )
                                          //                           )}
                                          //                       </Stack>
                                          //                   </RadioGroup>
                                          //               </VStack>
                                          //           </Card>
                                          //       );
                                          //   }
                                          return (
                                              <Card
                                                  key={item.uuid}
                                                  variant="outline"
                                                  p={4}
                                                  w="100%"
                                              >
                                                  <Text
                                                      fontWeight="bold"
                                                      mb={3}
                                                  >
                                                      {index + 1}. {item.title}
                                                  </Text>
                                                  {item.audio ? (
                                                      <Box
                                                          bg="gray.100"
                                                          p={3}
                                                          borderRadius="md"
                                                          textAlign="center"
                                                      >
                                                          <audio
                                                              controls
                                                              style={{
                                                                  width: "100%",
                                                              }}
                                                          >
                                                              <source
                                                                  src={
                                                                      item.audio
                                                                  }
                                                                  type="audio/ogg"
                                                              />
                                                              <source
                                                                  src={
                                                                      item.audio
                                                                  }
                                                                  type="audio/mpeg"
                                                              />
                                                          </audio>
                                                      </Box>
                                                  ) : null}
                                                  {item.image ? (
                                                      <Box
                                                          bg="gray.100"
                                                          p={3}
                                                          borderRadius="md"
                                                          textAlign="center"
                                                      >
                                                          <Image
                                                              alt="image"
                                                              src={item.image}
                                                          />
                                                      </Box>
                                                  ) : null}
                                                  <RadioGroup
                                                      onChange={(val) =>
                                                          handleSelectAnswer(
                                                              index,
                                                              val
                                                          )
                                                      }
                                                      value={
                                                          item.answers.find(
                                                              (a) => a.isChoose
                                                          )?.uuid || ""
                                                      }
                                                      colorScheme="blue"
                                                  >
                                                      <Stack spacing={3}>
                                                          {item.answers.map(
                                                              (option) => (
                                                                  <Radio
                                                                      key={
                                                                          option.uuid
                                                                      }
                                                                      value={
                                                                          option.uuid
                                                                      }
                                                                  >
                                                                      {
                                                                          option.content
                                                                      }
                                                                  </Radio>
                                                              )
                                                          )}
                                                      </Stack>
                                                  </RadioGroup>
                                              </Card>
                                          );
                                      }
                                  )
                                : null}
                        </VStack>

                        <Box p={4} borderTop="1px solid" borderColor="gray.200">
                            <Button
                                onClick={handleSubmit}
                                colorScheme="blue"
                                size="lg"
                                width="100%"
                                leftIcon={<FaCheck />}
                                disabled={isPending}
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
