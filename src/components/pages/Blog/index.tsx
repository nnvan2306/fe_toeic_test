import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { useGetBlogs } from "../../../services/blog/get-blogs";
import { BlogResponseType } from "../../../types/blog";
import MainTemPlate from "../../templates/MainTemPlate";

const Blog = () => {
    const { data } = useGetBlogs({});
    const blogPosts = useMemo(
        () =>
            (data?.data || []).map((item: BlogResponseType) => ({
                ...item,
            })),
        [data]
    ) as BlogResponseType[];

    return (
        <MainTemPlate>
            <Box py={8} w="100%">
                <Container maxW="container.xl">
                    <VStack spacing={8} align="stretch">
                        <VStack spacing={2} textAlign="center" mb={6}>
                            <Heading as="h1" size="2xl">
                                Our Blog
                            </Heading>
                            <Text
                                fontSize="lg"
                                color={useColorModeValue(
                                    "gray.600",
                                    "gray.400"
                                )}
                            >
                                Discover insights, tutorials, and news about web
                                development
                            </Text>
                        </VStack>

                        {blogPosts.length > 0 ? (
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 3 }}
                                spacing={8}
                                mt={8}
                            >
                                {blogPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Box textAlign="center" py={10}>
                                <Heading as="h3" size="md">
                                    No blog posts found
                                </Heading>
                                <Text mt={2}>
                                    Try changing your search or filter criteria.
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default Blog;

const BlogCard: React.FC<{ post: BlogResponseType }> = ({ post }) => {
    const cardBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.600", "gray.300");

    const navigate = useNavigate();

    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            bg={cardBg}
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
            }}
            cursor="pointer"
            onClick={() =>
                navigate(routesMap.BlogDetail.replace("/:id", `/${post.id}`))
            }
        >
            <Image
                src={post.thumbnail}
                alt={post.title}
                objectFit="cover"
                height="200px"
                width="100%"
            />

            <VStack
                p={5}
                w="100%"
                justifyContent="space-between"
                alignItems="start"
            >
                <Heading as="h3" size="md" mb={2} noOfLines={2}>
                    {post.title}
                </Heading>

                <Text noOfLines={3} mb={4} padding={"0 10px"} w={"100%"} fontSize={12} color={"gray.500"}>
                    {post.content}
                </Text>

                <Flex justifyContent="space-between" alignItems="center">
                    <HStack spacing={1} fontSize="xs" color={textColor}>
                        <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
                        <Text>•</Text>
                        <Text>{new Date(post.createdAt).toLocaleDateString()} read</Text>
                    </HStack>
                </Flex>
            </VStack>
        </Box>
    );
};
