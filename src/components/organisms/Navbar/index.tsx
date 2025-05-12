import React from "react";
import {
    Box,
    Flex,
    VStack,
    Text,
    Icon,
    Divider,
    Avatar,
    useColorModeValue,
    BoxProps,
    FlexProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { routesMap } from "../../../routes/routes";
import { useTranslation } from "react-i18next";
import icons from "../../../constants/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps extends BoxProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const user = useAppSelector((state) => state.user);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const LinkItems: Array<LinkItemProps> = [
        {
            name: t("navbar.user"),
            icon: icons.users,
            href: routesMap.UserManager,
        },
        {
            name: t("navbar.exam"),
            icon: icons.exam,
            href: routesMap.ExamManager,
        },
        {
            name: t("navbar.blog"),
            icon: icons.blog,
            href: routesMap.BlogManager,
        },
        { name: t("navbar.chart"), icon: icons.chart, href: routesMap.Chart },
    ];

    return (
        <Box
            w={{ base: "full", md: "20%" }}
            h="full"
            bg={bgColor}
            borderRight="1px"
            borderRightColor={borderColor}
            pos="fixed"
            boxShadow="sm"
            {...props}
        >
            <Flex direction="column" align="center" mb="6" mt="4">
                <Avatar
                    size="md"
                    name="User Name"
                    src="https://bit.ly/broken-link"
                    mb="2"
                />
                <Text fontWeight="medium">{user?.username}</Text>
                <Text fontSize="sm" color="gray.500">
                    {user?.email}
                </Text>
            </Flex>

            <Divider />

            <VStack align="stretch" spacing="1" mt="4">
                {LinkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        action={() => navigate(link.href)}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </VStack>

            <Divider mt="6" />
        </Box>
    );
};

export default Navbar;

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: React.ReactNode;
    action: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    children,
    action,
    ...rest
}) => {
    return (
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: useColorModeValue("teal.50", "teal.900"),
                color: useColorModeValue("teal.700", "teal.200"),
            }}
            {...rest}
            onClick={action}
        >
            {icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color: useColorModeValue("teal.500", "teal.300"),
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};
