import { Box, Heading, Divider, useColorModeValue } from "@chakra-ui/react";

type TitleManageProps = {
    title?: string;
};

const TitleManage = ({ title = "Tiêu đề trang" }: TitleManageProps) => {
    const dividerColor = useColorModeValue("gray.300", "gray.600");

    return (
        <Box mb={4} w="100%">
            <Heading as="h1" size="lg" fontWeight="semibold" mb={3}>
                {title}
            </Heading>
            <Divider borderColor={dividerColor} borderWidth="2px" />
        </Box>
    );
};

export default TitleManage;
