import { useMemo, useState } from "react";
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Text,
    Flex,
    Card,
    CardBody,
    CardHeader,
    Button,
    VStack,
    Badge,
    Divider,
    Input,
    FormControl,
    FormLabel,
    Select,
    List,
    ListItem,
    ListIcon,
    Progress,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import MainTemPlate from "../../templates/MainTemPlate";
import { FaInfoCircle, FaRedo, FaChevronRight } from "react-icons/fa";
import { grammarTopics } from "../../../constants";
import { IconType } from "react-icons/lib";
import { useGetCategoris } from "../../../services/category/get-all";
import { CategoryResponseType } from "../../../types/category";

type WordType = {
    word: string;
    definition: string;
    example: string;
};

type VocabSetType = {
    id: number;
    title: string;
    category: string;
    words: WordType[];
    completed: boolean;
};

type GrammarType = {
    id: number;
    title: string;
    description: string;
    examples: string[];
    rules: string[];
    timeSignals: string[];
    icon: IconType;
    completed: boolean;
};

const Learn = () => {
    const [activeGrammarTopic, setActiveGrammarTopic] =
        useState<GrammarType | null>(null);
    const [activeVocabSet, setActiveVocabSet] = useState<VocabSetType | null>(
        null
    );
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterCategory, setFilterCategory] = useState<string>("");

    const { data } = useGetCategoris({});
    const vocabularySets = useMemo(
        () =>
            (data?.data || []).map((item: CategoryResponseType) => ({
                id: item.id,
                title: item.title,
                category: item.title,
                words: item.Vocabularies,
                completed: false,
            })),
        [data]
    );

    const filteredVocabSets = vocabularySets.filter((set) => {
        const matchesSearch = set.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory
            ? set.category === filterCategory
            : true;
        return matchesSearch && matchesCategory;
    });

    const nextFlashcard = () => {
        if (
            activeVocabSet &&
            flashcardIndex < activeVocabSet.words?.length - 1
        ) {
            setFlashcardIndex(flashcardIndex + 1);
            setShowDefinition(false);
        } else {
            setFlashcardIndex(0);
            setShowDefinition(false);
        }
    };

    const prevFlashcard = () => {
        if (activeVocabSet && flashcardIndex > 0) {
            setFlashcardIndex(flashcardIndex - 1);
            setShowDefinition(false);
        } else if (activeVocabSet) {
            setFlashcardIndex(activeVocabSet.words?.length - 1);
            setShowDefinition(false);
        }
    };

    return (
        <MainTemPlate>
            <Box p={4} w="100%">
                <Heading mb={6}>Learn English</Heading>

                <Tabs variant="enclosed" colorScheme="teal" mb={4}>
                    <TabList>
                        <Tab>Grammar</Tab>
                        <Tab>Vocabulary</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex>
                                <Box width="30%" pr={4}>
                                    <Heading size="md" mb={4}>
                                        Grammar Topics
                                    </Heading>
                                    <VStack align="stretch" spacing={3}>
                                        {grammarTopics.map(
                                            (topic: GrammarType) => (
                                                <Card
                                                    key={topic.id}
                                                    cursor="pointer"
                                                    _hover={{ shadow: "md" }}
                                                    bg={
                                                        activeGrammarTopic &&
                                                        activeGrammarTopic.id ===
                                                            topic.id
                                                            ? "teal.50"
                                                            : "white"
                                                    }
                                                    onClick={() =>
                                                        setActiveGrammarTopic(
                                                            topic
                                                        )
                                                    }
                                                >
                                                    <CardBody py={2}>
                                                        <Flex
                                                            justify="space-between"
                                                            align="center"
                                                        >
                                                            <Text
                                                                fontWeight={
                                                                    topic.completed
                                                                        ? "normal"
                                                                        : "medium"
                                                                }
                                                            >
                                                                {topic.title}
                                                            </Text>
                                                        </Flex>
                                                    </CardBody>
                                                </Card>
                                            )
                                        )}
                                    </VStack>
                                </Box>

                                <Box width="70%" pl={4}>
                                    {activeGrammarTopic ? (
                                        <Card>
                                            <CardHeader>
                                                <Flex
                                                    justify="space-between"
                                                    align="center"
                                                >
                                                    <Heading size="md">
                                                        {
                                                            activeGrammarTopic.title
                                                        }
                                                    </Heading>
                                                </Flex>
                                            </CardHeader>
                                            <CardBody>
                                                <Text mb={4}>
                                                    {
                                                        activeGrammarTopic.description
                                                    }
                                                </Text>

                                                <Heading size="sm" mb={2}>
                                                    Rules:
                                                </Heading>
                                                <List spacing={2} mb={4}>
                                                    {activeGrammarTopic.rules.map(
                                                        (rule, index) => (
                                                            <ListItem
                                                                key={index}
                                                                display="flex"
                                                                alignItems="flex-start"
                                                            >
                                                                <ListIcon
                                                                    as={
                                                                        FaInfoCircle
                                                                    }
                                                                    color="blue.500"
                                                                />
                                                                <Text>
                                                                    {rule}
                                                                </Text>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>

                                                <Heading size="sm" mb={2}>
                                                    Examples:
                                                </Heading>
                                                <List spacing={2} mb={4}>
                                                    {activeGrammarTopic.examples.map(
                                                        (example, index) => (
                                                            <ListItem
                                                                key={index}
                                                                display="flex"
                                                                alignItems="flex-start"
                                                            >
                                                                <ListIcon
                                                                    as={
                                                                        FaChevronRight
                                                                    }
                                                                    color="green.500"
                                                                />
                                                                <Text>
                                                                    {example}
                                                                </Text>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>

                                                <Heading size="sm" mb={2}>
                                                    Time Signals:
                                                </Heading>
                                                <Flex
                                                    flexWrap="wrap"
                                                    gap={2}
                                                    mb={2}
                                                >
                                                    {activeGrammarTopic.timeSignals?.map(
                                                        (signal, index) => (
                                                            <Badge
                                                                key={index}
                                                                colorScheme="purple"
                                                                fontSize="sm"
                                                            >
                                                                {signal}
                                                            </Badge>
                                                        )
                                                    )}
                                                </Flex>
                                            </CardBody>
                                        </Card>
                                    ) : (
                                        <Flex
                                            justify="center"
                                            align="center"
                                            h="100%"
                                            bg="gray.50"
                                            borderRadius="md"
                                            p={8}
                                        >
                                            <Text color="gray.500">
                                                Select a grammar topic to begin
                                                learning
                                            </Text>
                                        </Flex>
                                    )}
                                </Box>
                            </Flex>
                        </TabPanel>

                        <TabPanel>
                            {!activeVocabSet ? (
                                <>
                                    <Box mb={6}>
                                        <Heading size="md" mb={4}>
                                            Vocabulary Sets
                                        </Heading>

                                        <Flex mb={4} gap={4}>
                                            {/* <FormControl>
                                                <FormLabel>Search</FormLabel>
                                                <Input
                                                    placeholder="Search vocabulary sets..."
                                                    value={searchTerm}
                                                    onChange={(e) =>
                                                        setSearchTerm(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Category</FormLabel>
                                                <Select
                                                    placeholder="All Categories"
                                                    value={filterCategory}
                                                    onChange={(e) =>
                                                        setFilterCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {vocabularySets?.length
                                                        ? vocabularySets.map(
                                                              (
                                                                  item: CategoryResponseType
                                                              ) => {
                                                                  return (
                                                                      <option
                                                                          value={
                                                                              item.id
                                                                          }
                                                                      >
                                                                          {
                                                                              item.title
                                                                          }
                                                                      </option>
                                                                  );
                                                              }
                                                          )
                                                        : null}
                                                </Select>
                                            </FormControl> */}
                                        </Flex>

                                        <Flex flexWrap="wrap" gap={4}>
                                            {filteredVocabSets.map((set) => (
                                                <Card
                                                    key={set.id}
                                                    width="calc(50% - 8px)"
                                                    cursor="pointer"
                                                    _hover={{ shadow: "md" }}
                                                    onClick={() => {
                                                        setActiveVocabSet(set);
                                                        setFlashcardIndex(0);
                                                        setShowDefinition(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <CardBody>
                                                        <Flex
                                                            justify="space-between"
                                                            align="flex-start"
                                                            mb={2}
                                                        >
                                                            <Heading size="sm">
                                                                {set.title}
                                                            </Heading>
                                                            {set.completed ? (
                                                                <Badge colorScheme="green">
                                                                    Completed
                                                                </Badge>
                                                            ) : (
                                                                <Badge>
                                                                    In Progress
                                                                </Badge>
                                                            )}
                                                        </Flex>
                                                        <Badge
                                                            colorScheme="blue"
                                                            mb={3}
                                                        >
                                                            {set.category}
                                                        </Badge>
                                                        <Text fontSize="sm">
                                                            {set.words?.length}{" "}
                                                            words
                                                        </Text>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </Flex>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mb={4}
                                    >
                                        <Button
                                            leftIcon={<FaChevronRight />}
                                            onClick={() => {
                                                setActiveVocabSet(null);
                                                setShowDefinition(false);
                                            }}
                                            variant="outline"
                                        >
                                            Back to Sets
                                        </Button>
                                        <Heading size="md">
                                            {activeVocabSet.title}
                                        </Heading>
                                    </Flex>

                                    <Flex justify="center" mb={2}>
                                        <Text>
                                            Card {flashcardIndex + 1} of{" "}
                                            {activeVocabSet.words?.length}
                                        </Text>
                                    </Flex>
                                    <Progress
                                        value={
                                            ((flashcardIndex + 1) /
                                                activeVocabSet.words?.length) *
                                            100
                                        }
                                        size="sm"
                                        mb={6}
                                        colorScheme="purple"
                                    />

                                    <Card
                                        height="300px"
                                        mb={4}
                                        onClick={() =>
                                            setShowDefinition(!showDefinition)
                                        }
                                        cursor="pointer"
                                        textAlign="center"
                                    >
                                        <CardBody
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {!showDefinition ? (
                                                <>
                                                    <Heading size="lg" mb={4}>
                                                        {
                                                            activeVocabSet
                                                                .words[
                                                                flashcardIndex
                                                            ].word
                                                        }
                                                    </Heading>
                                                    <Text color="gray.500">
                                                        (Click to see
                                                        definition)
                                                    </Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Heading size="md" mb={4}>
                                                        {
                                                            activeVocabSet
                                                                .words[
                                                                flashcardIndex
                                                            ].word
                                                        }
                                                    </Heading>
                                                    <Text mb={4}>
                                                        {
                                                            activeVocabSet
                                                                .words[
                                                                flashcardIndex
                                                            ].definition
                                                        }
                                                    </Text>
                                                    <Divider my={4} />
                                                    <Text
                                                        fontStyle="italic"
                                                        color="gray.600"
                                                    >
                                                        Example:{" "}
                                                        {
                                                            activeVocabSet
                                                                .words[
                                                                flashcardIndex
                                                            ].example
                                                        }
                                                    </Text>
                                                </>
                                            )}
                                        </CardBody>
                                    </Card>

                                    <Flex justify="center" gap={4}>
                                        <Button
                                            onClick={prevFlashcard}
                                            leftIcon={
                                                <Icon
                                                    as={FaChevronRight}
                                                    transform="rotate(180deg)"
                                                />
                                            }
                                        >
                                            Previous
                                        </Button>
                                        <IconButton
                                            aria-label="Flip card"
                                            icon={<FaRedo />}
                                            onClick={() =>
                                                setShowDefinition(
                                                    !showDefinition
                                                )
                                            }
                                        />
                                        <Button
                                            onClick={nextFlashcard}
                                            rightIcon={<FaChevronRight />}
                                        >
                                            Next
                                        </Button>
                                    </Flex>
                                </>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </MainTemPlate>
    );
};

export default Learn;
