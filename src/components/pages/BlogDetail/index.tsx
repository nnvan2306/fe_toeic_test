import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Heading,
    Image,
    useColorModeValue
} from "@chakra-ui/react";
import { useMemo } from "react";
import Markdown from 'react-markdown';
import { useParams } from "react-router-dom";
import { useGetBlog } from "../../../services/blog/get-blog";
import { BlogResponseType } from "../../../types/blog";
import MainTemPlate from "../../templates/MainTemPlate";

const BlogDetail = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const contentBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.300");
    const { id } = useParams();

    const { data } = useGetBlog({ id: Number(id) || 0 });
    const blogPost = useMemo(() => data?.data, [data]) as BlogResponseType;

    return (
        <MainTemPlate>
            {blogPost ? <Box bg={bgColor} py={8} w="100%">
                <Container maxW="container.xl">
                    <Breadcrumb mb={8} fontSize="sm">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#">
                                {blogPost.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Box
                        bg={contentBg}
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                    >
                        <Image
                            src={blogPost.thumbnail}
                            alt={blogPost.title}
                            objectFit="cover"
                            width="100%"
                            height={{ base: "200px", md: "400px" }}
                        />

                        <Box p={{ base: 5, md: 8 }}>
                            <Heading as="h1" size="xl" mb={4}>
                                {blogPost.title}
                            </Heading>

                            <Box
                                className="blog-content"
                                color={textColor}
                            >
                                <Markdown>{blogPost.content}</Markdown>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box> : ""}
        </MainTemPlate>
    );
};

export default BlogDetail;
