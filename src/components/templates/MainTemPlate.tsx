import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../organisms/Header";

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <Box h="100vh">
            <Header />
            <Flex minH="100%" w={"100%"}>
                {children}
            </Flex>
        </Box>
    );
};

export default MainTemPlate;
