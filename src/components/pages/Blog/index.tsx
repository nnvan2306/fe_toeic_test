import React from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Image,
    HStack,
    VStack,
    Button,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import MainTemPlate from "../../templates/MainTemPlate";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";
import { BlogResponseType } from "../../../types/blog";

const blogPosts: BlogResponseType[] = [
    {
        id: 1,
        title: "Building Modern UIs with Chakra UI and React",
        excerpt:
            "Learn how to create beautiful, accessible user interfaces using Chakra UI component library with React.",
        author: "Jane Smith",
        date: "May 10, 2025",
        readTime: "5 min",
        imageUrl: "https://via.placeholder.com/500x300",
    },
    {
        id: 2,
        title: "TypeScript Best Practices for 2025",
        excerpt:
            "Discover the latest TypeScript patterns and practices that will improve your code quality.",
        author: "John Doe",
        date: "May 5, 2025",
        readTime: "8 min",
        imageUrl: "https://via.placeholder.com/500x300",
    },
    {
        id: 3,
        title: "State Management Solutions for React Applications",
        excerpt:
            "Compare different state management libraries and approaches for React applications.",
        author: "Alex Johnson",
        date: "April 28, 2025",
        readTime: "6 min",
        imageUrl: "https://via.placeholder.com/500x300",
    },
    {
        id: 4,
        title: "Creating Responsive Layouts with Chakra UI",
        excerpt:
            "Learn how to build fully responsive web designs using Chakra UI's powerful layout components.",
        author: "Maria Garcia",
        date: "April 22, 2025",
        readTime: "7 min",
        imageUrl: "https://via.placeholder.com/500x300",
    },
];

const Blog = () => {
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

                        {blogPosts.length > 0 && (
                            <Flex justify="center" mt={4}>
                                <HStack spacing={2}>
                                    <Button size="sm" variant="outline">
                                        Previous
                                    </Button>
                                    <Button size="sm" colorScheme="teal">
                                        1
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        2
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        3
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Next
                                    </Button>
                                </HStack>
                            </Flex>
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
                src={post.imageUrl}
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

                <Text color={textColor} noOfLines={3} mb={4}>
                    {post.excerpt}
                </Text>

                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="sm" color={textColor}>
                        By {post.author}
                    </Text>
                    <HStack spacing={1} fontSize="xs" color={textColor}>
                        <Text>{post.date}</Text>
                        <Text>•</Text>
                        <Text>{post.readTime} read</Text>
                    </HStack>
                </Flex>
            </VStack>
        </Box>
    );
};
