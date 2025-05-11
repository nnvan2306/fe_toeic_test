import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Navbar from "../organisms/Navbar";

type Props = { children: React.ReactNode };

const ManagerTemplate = ({ children }: Props) => {
    return (
        <Box h="100vh">
            <Header />
            <Flex h="calc(100% - 64px)" w="100%">
                <Navbar />
                <Box
                    ml={{ base: 0, md: "20%" }}
                    p="4"
                    w={{ base: "100%", md: "80%" }}
                    overflow="auto"
                >
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default ManagerTemplate;
