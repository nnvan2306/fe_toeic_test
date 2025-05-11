import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    HStack,
    VStack,
    Avatar,
    Button,
    Flex,
    useColorModeValue,
    Link,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import MainTemPlate from "../../templates/MainTemPlate";
import { useParams } from "react-router-dom";
import { useGetBlog } from "../../../services/blog/get-blog";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    date: string;
    readTime: string;
    imageUrl: string;
    tags: string[];
}

const blogPost: BlogPost = {
    id: "1",
    title: "Building Modern UIs with Chakra UI and React",
    content: `
  <p>In the fast-evolving world of web development, creating user interfaces that are both visually appealing and functionally robust is a continuous challenge. Chakra UI has emerged as a powerful solution to this challenge, offering a comprehensive component library for React applications. This blog post explores how Chakra UI, combined with React, can streamline your UI development process.</p>

  <h2>Why Choose Chakra UI?</h2>
  <p>Chakra UI stands out among React component libraries for several reasons. First, it provides a set of accessible and customizable components that follow the WAI-ARIA guidelines, making your applications more inclusive to users with disabilities. Second, it offers a consistent API, reducing the learning curve for developers. Third, it's built with a focus on modularity, allowing you to use only what you need.</p>

  <p>The library also includes a powerful theme system that makes it easy to maintain consistent styles across your application. You can define colors, typography, spacing, and other design tokens once, and they will be applied consistently throughout your UI.</p>

  <h2>Getting Started with Chakra UI</h2>
  <p>To begin using Chakra UI in your React project, you first need to install it:</p>
  
  <pre><code>npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion</code></pre>
  
  <p>After installation, wrap your application with the ChakraProvider to make the components available throughout your app:</p>
  
  <pre><code>import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <YourApp />
    </ChakraProvider>
  )
}</code></pre>

  <h2>Building Responsive Layouts</h2>
  <p>One of the standout features of Chakra UI is its approach to responsive design. Instead of managing media queries manually, you can specify different values for properties at different breakpoints:</p>
  
  <pre><code>// This box will be 100% width on mobile, 50% on tablet, and 25% on desktop
<Box width={{ base: "100%", md: "50%", lg: "25%" }}>
  Content
</Box></code></pre>

  <p>This declarative approach to responsiveness simplifies the process of creating layouts that work well across various screen sizes.</p>

  <h2>Styling in Chakra UI</h2>
  <p>Chakra UI provides a style props system that allows you to apply styles directly to components without writing CSS. This approach bridges the gap between design and implementation, making it easier to translate design specifications into code:</p>
  
  <pre><code><Button
  backgroundColor="blue.500"
  color="white"
  _hover={{ backgroundColor: "blue.600" }}
  _active={{ backgroundColor: "blue.700" }}
>
  Click me
</Button></code></pre>

  <p>You can also create custom components by extending existing ones, allowing you to maintain a consistent design language throughout your application.</p>

  <h2>Advanced Usage with TypeScript</h2>
  <p>Chakra UI works seamlessly with TypeScript, providing type definitions for all components and utilities. This integration enhances the development experience by offering autocompletion, type checking, and better documentation.</p>
  
  <pre><code>import { Box, BoxProps } from "@chakra-ui/react"

interface CustomBoxProps extends BoxProps {
  customProp?: string
}

const CustomBox: React.FC<CustomBoxProps> = ({ customProp, ...rest }) => {
  return <Box {...rest}>{customProp}</Box>
}</code></pre>

  <h2>Conclusion</h2>
  <p>Chakra UI represents a significant advancement in the React ecosystem, offering a comprehensive solution for building modern user interfaces. By combining accessibility, customization, and developer experience, it provides a solid foundation for applications of all sizes.</p>
  
  <p>As web development continues to evolve, tools like Chakra UI that balance power with simplicity will play an increasingly important role in helping developers create exceptional user experiences efficiently.</p>
  `,
    author: {
        name: "Jane Smith",
        avatar: "https://via.placeholder.com/150",
        bio: "Frontend Developer specializing in React and UI libraries.",
    },
    date: "May 10, 2025",
    readTime: "5 min",
    imageUrl: "https://via.placeholder.com/1200x600",
    tags: ["React", "Chakra UI", "Frontend"],
};

const BlogDetail = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const contentBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.700", "gray.300");
    const { id } = useParams();

    const { data } = useGetBlog({ id: Number(id) || 0 });
    console.log(data);

    const renderContent = () => {
        return { __html: blogPost.content };
    };

    return (
        <MainTemPlate>
            <Box bg={bgColor} py={8} w="100%">
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

                    <Grid
                        templateColumns={{ base: "1fr", lg: "1fr 320px" }}
                        gap={8}
                    >
                        <GridItem>
                            <Box
                                bg={contentBg}
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="md"
                            >
                                <Image
                                    src={blogPost.imageUrl}
                                    alt={blogPost.title}
                                    objectFit="cover"
                                    width="100%"
                                    height={{ base: "200px", md: "400px" }}
                                />

                                <Box p={{ base: 5, md: 8 }}>
                                    <Heading as="h1" size="xl" mb={4}>
                                        {blogPost.title}
                                    </Heading>

                                    <Flex
                                        direction={{
                                            base: "column",
                                            sm: "row",
                                        }}
                                        justify="space-between"
                                        align={{
                                            base: "flex-start",
                                            sm: "center",
                                        }}
                                        mb={6}
                                        pb={6}
                                        borderBottom="1px"
                                        borderColor={borderColor}
                                    >
                                        <HStack
                                            spacing={4}
                                            mb={{ base: 4, sm: 0 }}
                                        >
                                            <Avatar
                                                size="md"
                                                src={blogPost.author.avatar}
                                                name={blogPost.author.name}
                                            />
                                            <Box>
                                                <Text fontWeight="bold">
                                                    {blogPost.author.name}
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.500"
                                                >
                                                    {blogPost.date} •{" "}
                                                    {blogPost.readTime} read
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </Flex>

                                    <Box
                                        className="blog-content"
                                        color={textColor}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={renderContent()}
                                        />
                                    </Box>

                                    <Box
                                        mt={10}
                                        p={6}
                                        borderRadius="lg"
                                        bg={useColorModeValue(
                                            "gray.50",
                                            "gray.700"
                                        )}
                                    >
                                        <Flex
                                            direction={{
                                                base: "column",
                                                sm: "row",
                                            }}
                                            align={{
                                                base: "center",
                                                sm: "flex-start",
                                            }}
                                        >
                                            <Avatar
                                                size="xl"
                                                src={blogPost.author.avatar}
                                                name={blogPost.author.name}
                                                mb={{ base: 4, sm: 0 }}
                                                mr={{ base: 0, sm: 4 }}
                                            />
                                            <Box
                                                textAlign={{
                                                    base: "center",
                                                    sm: "left",
                                                }}
                                            >
                                                <Heading
                                                    as="h3"
                                                    size="md"
                                                    mb={2}
                                                >
                                                    About {blogPost.author.name}
                                                </Heading>
                                                <Text>
                                                    {blogPost.author.bio}
                                                </Text>
                                                <Button
                                                    mt={4}
                                                    colorScheme="teal"
                                                    size="sm"
                                                >
                                                    View all posts
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>

                        <GridItem>
                            <VStack
                                spacing={8}
                                align="stretch"
                                position="sticky"
                                top="100px"
                            >
                                <Box
                                    bg={contentBg}
                                    p={5}
                                    borderRadius="md"
                                    boxShadow="sm"
                                    border="1px"
                                    borderColor={borderColor}
                                >
                                    <Heading as="h3" size="md" mb={4}>
                                        Table of Contents
                                    </Heading>
                                    <VStack align="stretch" spacing={2}>
                                        <Link
                                            color="teal.500"
                                            href="#why-choose-chakra-ui"
                                        >
                                            Why Choose Chakra UI?
                                        </Link>
                                        <Link
                                            color="teal.500"
                                            href="#getting-started"
                                        >
                                            Getting Started with Chakra UI
                                        </Link>
                                        <Link
                                            color="teal.500"
                                            href="#building-responsive-layouts"
                                        >
                                            Building Responsive Layouts
                                        </Link>
                                        <Link
                                            color="teal.500"
                                            href="#styling-in-chakra-ui"
                                        >
                                            Styling in Chakra UI
                                        </Link>
                                        <Link
                                            color="teal.500"
                                            href="#advanced-usage-with-typescript"
                                        >
                                            Advanced Usage with TypeScript
                                        </Link>
                                        <Link
                                            color="teal.500"
                                            href="#conclusion"
                                        >
                                            Conclusion
                                        </Link>
                                    </VStack>
                                </Box>
                            </VStack>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
        </MainTemPlate>
    );
};

export default BlogDetail;
