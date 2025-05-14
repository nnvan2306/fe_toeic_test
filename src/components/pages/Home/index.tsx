import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Link,
    Stack,
    Text,
    VStack,
    HStack,
    Icon,
    Divider,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import {
    FaBook,
    FaCheck,
    FaChartLine,
    FaClock,
    FaCrown,
    FaGraduationCap,
    FaLaptop,
    FaRegLightbulb,
    FaTrophy,
    FaUserGraduate,
} from "react-icons/fa";
import MainTemPlate from "../../templates/MainTemPlate";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { useTranslation } from "react-i18next";

const Home = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.800");
    const primaryColor = useColorModeValue("teal.500", "teal.300");
    const secondaryColor = useColorModeValue("blue.600", "blue.300");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const { t } = useTranslation();

    const navigate = useNavigate();
    return (
        <MainTemPlate>
            <Box w="100%">
                <Box bg={useColorModeValue("teal.50", "teal.900")} py={20}>
                    <Container maxW="container.xl">
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={8}
                            align="center"
                            justify="space-between"
                        >
                            <VStack spacing={4} align="flex-start" maxW="600px">
                                <Heading
                                    as="h1"
                                    size="2xl"
                                    color={secondaryColor}
                                    lineHeight="shorter"
                                >
                                    {t("home.banner.title")}
                                </Heading>
                                <Text fontSize="xl">
                                    {t("home.banner.subTitle")}
                                </Text>
                                <HStack spacing={4} pt={4}>
                                    <Button
                                        colorScheme="teal"
                                        size="lg"
                                        rounded="md"
                                        onClick={() => navigate(routesMap.Exam)}
                                    >
                                        {t("home.banner.button")}
                                    </Button>
                                </HStack>
                            </VStack>
                            <Box
                                boxSize={{ base: "300px", md: "400px" }}
                                bgGradient="linear(to-r, teal.400, blue.500)"
                                rounded="full"
                                p={2}
                            >
                                <Box
                                    bg={cardBg}
                                    rounded="full"
                                    p={4}
                                    position="relative"
                                    height="100%"
                                    width="100%"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Icon
                                        as={FaTrophy}
                                        boxSize="50%"
                                        color={primaryColor}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Container>
                </Box>

                <Box py={16}>
                    <Container maxW="container.xl">
                        <VStack spacing={12}>
                            <VStack textAlign="center" spacing={4} maxW="800px">
                                <Heading
                                    as="h2"
                                    size="xl"
                                    color={secondaryColor}
                                >
                                    {t("home.about.title")}
                                </Heading>
                                <Text fontSize="lg">
                                    {t("home.about.subTitle")}
                                </Text>
                            </VStack>

                            <SimpleGrid
                                columns={{ base: 1, md: 3 }}
                                spacing={10}
                                width="full"
                            >
                                <FeatureCard
                                    icon={FaRegLightbulb}
                                    title={t("home.about.items.0.title")}
                                    description={t(
                                        "home.about.items.0.subTitle"
                                    )}
                                />
                                <FeatureCard
                                    icon={FaChartLine}
                                    title={t("home.about.items.1.title")}
                                    description={t(
                                        "home.about.items.1.subTitle"
                                    )}
                                />
                                <FeatureCard
                                    icon={FaCrown}
                                    title={t("home.about.items.2.title")}
                                    description={t(
                                        "home.about.items.2.subTitle"
                                    )}
                                />
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>

                <Box bg={bgColor} py={16}>
                    <Container maxW="container.xl">
                        <VStack spacing={12}>
                            <Heading
                                as="h2"
                                size="xl"
                                color={secondaryColor}
                                textAlign="center"
                            >
                                {t("home.whyChoose.title")}
                            </Heading>

                            <Grid
                                templateColumns={{
                                    base: "repeat(1, 1fr)",
                                    md: "repeat(2, 1fr)",
                                }}
                                gap={8}
                            >
                                <AdvantageCard
                                    title={t("home.whyChoose.items.0.title")}
                                    description={t(
                                        "home.whyChoose.items.0.subTitle"
                                    )}
                                    icon={FaBook}
                                />
                                <AdvantageCard
                                    title={t("home.whyChoose.items.1.title")}
                                    description={t(
                                        "home.whyChoose.items.1.subTitle"
                                    )}
                                    icon={FaChartLine}
                                />
                                <AdvantageCard
                                    title={t("home.whyChoose.items.2.title")}
                                    description={t(
                                        "home.whyChoose.items.2.subTitle"
                                    )}
                                    icon={FaUserGraduate}
                                />
                                <AdvantageCard
                                    title={t("home.whyChoose.items.3.title")}
                                    description={t(
                                        "home.whyChoose.items.3.subTitle"
                                    )}
                                    icon={FaLaptop}
                                />
                            </Grid>
                        </VStack>
                    </Container>
                </Box>

                <Box py={16}>
                    <Container maxW="container.xl">
                        <VStack spacing={12}>
                            <VStack textAlign="center" spacing={4}>
                                <Heading
                                    as="h2"
                                    size="xl"
                                    color={secondaryColor}
                                >
                                    {t("home.feature.title")}
                                </Heading>
                                <Text fontSize="lg" maxW="800px">
                                    {t("home.feature.subTitle")}
                                </Text>
                            </VStack>

                            <SimpleGrid
                                columns={{ base: 1, md: 3 }}
                                spacing={10}
                                width="full"
                            >
                                <Box
                                    bg={cardBg}
                                    p={6}
                                    rounded="lg"
                                    shadow="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    transition="all 0.3s"
                                    _hover={{
                                        transform: "translateY(-5px)",
                                        shadow: "lg",
                                    }}
                                >
                                    <VStack spacing={4} align="flex-start">
                                        <Box p={2} bg="teal.50" rounded="md">
                                            <Icon
                                                as={FaBook}
                                                boxSize={6}
                                                color="teal.500"
                                            />
                                        </Box>
                                        <Heading as="h3" size="md">
                                            {t("home.feature.items.0.title")}
                                        </Heading>
                                        <Text>
                                            {t("home.feature.items.0.subTitle")}
                                        </Text>
                                        <List spacing={2}>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.0.lists.0"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.0.lists.1"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.0.lists.2"
                                                )}
                                            </ListItem>
                                        </List>
                                    </VStack>
                                </Box>

                                <Box
                                    bg={cardBg}
                                    p={6}
                                    rounded="lg"
                                    shadow="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    transition="all 0.3s"
                                    _hover={{
                                        transform: "translateY(-5px)",
                                        shadow: "lg",
                                    }}
                                >
                                    <VStack spacing={4} align="flex-start">
                                        <Box p={2} bg="blue.50" rounded="md">
                                            <Icon
                                                as={FaGraduationCap}
                                                boxSize={6}
                                                color="blue.500"
                                            />
                                        </Box>
                                        <Heading as="h3" size="md">
                                            {t("home.feature.items.1.title")}
                                        </Heading>
                                        <Text>
                                            {t("home.feature.items.1.subTitle")}
                                        </Text>
                                        <List spacing={2}>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.1.lists.0"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.1.lists.1"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.1.lists.2"
                                                )}
                                            </ListItem>
                                        </List>
                                    </VStack>
                                </Box>

                                <Box
                                    bg={cardBg}
                                    p={6}
                                    rounded="lg"
                                    shadow="md"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    transition="all 0.3s"
                                    _hover={{
                                        transform: "translateY(-5px)",
                                        shadow: "lg",
                                    }}
                                >
                                    <VStack spacing={4} align="flex-start">
                                        <Box p={2} bg="purple.50" rounded="md">
                                            <Icon
                                                as={FaChartLine}
                                                boxSize={6}
                                                color="purple.500"
                                            />
                                        </Box>
                                        <Heading as="h3" size="md">
                                            {t("home.feature.items.0.title")}
                                        </Heading>
                                        <Text>
                                            {t("home.feature.items.0.subTitle")}
                                        </Text>
                                        <List spacing={2}>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.2.lists.0"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.2.lists.1"
                                                )}
                                            </ListItem>
                                            <ListItem>
                                                <ListIcon
                                                    as={FaCheck}
                                                    color="green.500"
                                                />
                                                {t(
                                                    "home.feature.items.2.lists.2"
                                                )}
                                            </ListItem>
                                        </List>
                                    </VStack>
                                </Box>
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>

                <Box bg={bgColor} py={16}>
                    <Container maxW="container.xl">
                        <VStack spacing={12}>
                            <Heading
                                as="h2"
                                size="xl"
                                color={secondaryColor}
                                textAlign="center"
                            >
                                {t("home.number.title")}
                            </Heading>

                            <SimpleGrid
                                columns={{ base: 1, sm: 2, md: 4 }}
                                spacing={8}
                                width="full"
                            >
                                <StatBox
                                    number="50,000+"
                                    label={t("home.number.items.0")}
                                    icon={FaUserGraduate}
                                />
                                <StatBox
                                    number="1,000+"
                                    label={t("home.number.items.1")}
                                    icon={FaBook}
                                />
                                <StatBox
                                    number="95%"
                                    label={t("home.number.items.2")}
                                    icon={FaTrophy}
                                />
                                <StatBox
                                    number="24/7"
                                    label={t("home.number.items.3")}
                                    icon={FaClock}
                                />
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>

                <Box bg="gray.800" color="white" py={12}>
                    <Container maxW="container.xl">
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(4, 1fr)",
                            }}
                            gap={8}
                        >
                            <VStack align="flex-start" spacing={4}>
                                <Heading as="h3" size="md">
                                    TOEIC Online Test
                                </Heading>
                                <Text>{t("footer.title")}</Text>
                            </VStack>

                            <VStack align="flex-start" spacing={4}>
                                <Heading as="h3" size="md">
                                    {t("footer.flash.title")}
                                </Heading>
                                <Link>{t("footer.flash.items.0")}</Link>
                                <Link>{t("footer.flash.items.1")}</Link>
                                <Link>{t("footer.flash.items.2")}</Link>
                                <Link>{t("footer.flash.items.3")}</Link>
                                <Link>{t("footer.flash.items.4")}</Link>
                            </VStack>

                            <VStack align="flex-start" spacing={4}>
                                <Heading as="h3" size="md">
                                    {t("footer.service.title")}
                                </Heading>
                                <Link>{t("footer.service.items.o")}</Link>
                                <Link>{t("footer.service.items.1")}</Link>
                                <Link>{t("footer.service.items.2")}</Link>
                                <Link>{t("footer.service.items.3")}</Link>
                            </VStack>

                            <VStack align="flex-start" spacing={4}>
                                <Heading as="h3" size="md">
                                    {t("footer.contact.title")}
                                </Heading>
                                <Text>Email: info@toeic-test.vn</Text>
                                <Text>{t("footer.contact.items.0")}</Text>
                                <Text>{t("footer.contact.items.1")}</Text>
                            </VStack>
                        </Grid>

                        <Divider my={8} borderColor="gray.600" />

                        <Text textAlign="center">
                            © {new Date().getFullYear()} TOEIC Online Test. Tất
                            cả quyền được bảo lưu.
                        </Text>
                    </Container>
                </Box>
            </Box>
        </MainTemPlate>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureCard = ({ icon, title, description }: any) => {
    return (
        <Box
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded="lg"
            shadow="md"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            height="100%"
        >
            <VStack spacing={4} align="flex-start">
                <Icon
                    as={icon}
                    boxSize={10}
                    color={useColorModeValue("teal.500", "teal.300")}
                />
                <Heading as="h3" size="md">
                    {title}
                </Heading>
                <Text>{description}</Text>
            </VStack>
        </Box>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdvantageCard = ({ title, description, icon }: any) => {
    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    return (
        <Flex
            bg={cardBg}
            p={6}
            rounded="lg"
            shadow="md"
            borderWidth="1px"
            borderColor={borderColor}
            align="center"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
        >
            <Box
                mr={4}
                p={3}
                bg={useColorModeValue("teal.50", "teal.900")}
                rounded="full"
                color="teal.500"
            >
                <Icon as={icon} boxSize={6} />
            </Box>
            <Box>
                <Heading as="h3" size="md" mb={2}>
                    {title}
                </Heading>
                <Text>{description}</Text>
            </Box>
        </Flex>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatBox = ({ number, label, icon }: any) => {
    return (
        <VStack
            spacing={4}
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
            shadow="md"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align="center"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
        >
            <Box
                p={3}
                bg={useColorModeValue("teal.50", "teal.900")}
                rounded="full"
            >
                <Icon as={icon} boxSize={8} color="teal.500" />
            </Box>
            <Stat textAlign="center">
                <StatNumber
                    fontSize="3xl"
                    fontWeight="bold"
                    color={useColorModeValue("teal.500", "teal.300")}
                >
                    {number}
                </StatNumber>
                <StatLabel fontSize="lg">{label}</StatLabel>
            </Stat>
        </VStack>
    );
};

export default Home;
