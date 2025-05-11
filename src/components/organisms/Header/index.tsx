import {
    Flex,
    Text,
    Button,
    HStack,
    useColorModeValue,
    Popover,
    PopoverTrigger,
    Avatar,
    Box,
    PopoverContent,
    PopoverBody,
    VStack,
    Divider,
    Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { useCallback } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
    const bgColor = useColorModeValue("white", "gray.800");
    const greenColor = "#2A804F";
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    const isActive = useCallback(
        (path: string) => path === pathName,
        [pathName]
    );
    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const buttonBg = useColorModeValue("white", "gray.800");
    const buttonHoverBg = useColorModeValue("gray.100", "gray.700");
    const popoverBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const itemHoverBg = useColorModeValue("gray.100", "gray.700");
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            px={6}
            py={3}
            bg={bgColor}
            // #e9fffa
            boxShadow="sm"
        >
            <Flex align="center">
                <Text _hover={{ textDecoration: "none" }}>
                    <Flex align="center">
                        <Text
                            fontSize="xl"
                            color="gray.500"
                            fontWeight="medium"
                            ml={3}
                            cursor="pointer"
                            onClick={() => navigate(routesMap.Home)}
                        >
                            TOEIC Online Test
                        </Text>
                    </Flex>
                </Text>
            </Flex>

            <HStack
                spacing={6}
                display={{ base: "none", md: "flex" }}
                flex={1}
                justify="center"
            >
                <Text
                    px={2}
                    py={1}
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{ color: greenColor }}
                    cursor="pointer"
                    textTransform="uppercase"
                    borderBottom={isActive(routesMap.Home) ? "2px solid" : ""}
                    borderColor={greenColor}
                    onClick={() => navigate(routesMap.Home)}
                >
                    {t("headers.aboutUs")}
                </Text>
                <Text
                    px={2}
                    py={1}
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{ color: greenColor }}
                    cursor="pointer"
                    textTransform="uppercase"
                    borderBottom={isActive(routesMap.Exam) ? "2px solid" : ""}
                    borderColor={greenColor}
                    onClick={() => navigate(routesMap.Exam)}
                >
                    {t("headers.test")}
                </Text>
                <Text
                    px={2}
                    py={1}
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{ color: greenColor }}
                    cursor="pointer"
                    textTransform="uppercase"
                    borderBottom={isActive(routesMap.Learn) ? "2px solid" : ""}
                    borderColor={greenColor}
                    onClick={() => navigate(routesMap.Learn)}
                >
                    {t("headers.review")}
                </Text>
                <Text
                    px={2}
                    py={1}
                    fontWeight="medium"
                    color="gray.600"
                    _hover={{ color: greenColor }}
                    cursor="pointer"
                    textTransform="uppercase"
                    onClick={() => navigate(routesMap.Blog)}
                    borderBottom={isActive(routesMap.Blog) ? "2px solid" : ""}
                    borderColor={greenColor}
                >
                    {t("headers.blog")}
                </Text>
            </HStack>

            <HStack spacing={3}>
                <Button
                    bg={greenColor}
                    w={120}
                    color="white"
                    borderRadius="md"
                    _hover={{ bg: "#236B40" }}
                    fontWeight="bold"
                    onClick={() => navigate(routesMap.Regsiter)}
                >
                    {t("headers.buttons.login")}
                </Button>
                <Button
                    variant="outline"
                    w={120}
                    borderColor={greenColor}
                    color={greenColor}
                    borderRadius="md"
                    _hover={{ bg: "green.50" }}
                    fontWeight="bold"
                    onClick={() => navigate(routesMap.Login)}
                >
                    {t("headers.buttons.register")}
                </Button>
                <Popover placement="bottom-end">
                    <PopoverTrigger>
                        <Button
                            rightIcon={<FiChevronDown />}
                            variant="ghost"
                            py={2}
                            px={4}
                            bg={buttonBg}
                            _hover={{ bg: buttonHoverBg }}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <HStack spacing={3}>
                                <Avatar
                                    size="sm"
                                    // name={username}
                                    // src={avatarUrl}
                                />
                                <Box display={{ base: "none", md: "block" }}>
                                    <Text
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="left"
                                    >
                                        Van{" "}
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        width="240px"
                        bg={popoverBg}
                        borderColor={borderColor}
                        borderRadius="md"
                        boxShadow="lg"
                    >
                        <PopoverBody p={0}>
                            <VStack align="stretch" spacing={0}>
                                {/* User Info */}
                                <Box px={4} py={3}>
                                    <HStack spacing={3}>
                                        <Avatar
                                            size="md"
                                            name={"van"}
                                            src={""}
                                        />
                                        <Box>
                                            <Text fontWeight="medium">
                                                {"Van"}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                @
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Divider />
                                <Button
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    leftIcon={<Icon as={FiUser} boxSize={4} />}
                                    py={3}
                                    borderRadius={0}
                                    _hover={{ bg: itemHoverBg }}
                                    onClick={() => navigate(routesMap.Profile)}
                                >
                                    {t("headers.popover.profile")}
                                </Button>
                                <Button
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    leftIcon={<Icon as={FiUser} boxSize={4} />}
                                    py={3}
                                    borderRadius={0}
                                    _hover={{ bg: itemHoverBg }}
                                    onClick={() =>
                                        navigate(routesMap.UserManager)
                                    }
                                >
                                    {t("headers.popover.manage")}
                                </Button>
                                <Button
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    leftIcon={
                                        <Icon
                                            as={FiLogOut}
                                            boxSize={4}
                                            color="red.500"
                                        />
                                    }
                                    color="red.500"
                                    py={3}
                                    borderRadius={0}
                                    _hover={{ bg: itemHoverBg }}
                                    onClick={() => {}}
                                >
                                    {t("headers.popover.logout")}
                                </Button>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <HStack gap={0}>
                    <Button
                        variant="outline"
                        w={16}
                        bg={i18n.language === "en" ? greenColor : ""}
                        borderColor={greenColor}
                        color={i18n.language === "en" ? "white" : greenColor}
                        borderRadius="md"
                        _hover={{ bg: "green.50" }}
                        fontWeight="bold"
                        roundedRight={0}
                        onClick={() => handleChangeLanguage("en")}
                    >
                        Eng
                    </Button>{" "}
                    <Button
                        variant="outline"
                        w={16}
                        bg={i18n.language === "vi" ? greenColor : ""}
                        borderColor={greenColor}
                        color={i18n.language === "vi" ? "white" : greenColor}
                        borderRadius="md"
                        _hover={{ bg: "green.50" }}
                        fontWeight="bold"
                        roundedLeft={0}
                        onClick={() => handleChangeLanguage("vi")}
                    >
                        Vi
                    </Button>
                </HStack>
            </HStack>
        </Flex>
    );
};

export default Header;
