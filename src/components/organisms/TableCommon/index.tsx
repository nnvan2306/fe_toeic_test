import {
    Box,
    Center,
    Flex,
    Image,
    Spinner,
    Table,
    TableProps,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import get from "lodash.get";
import { useTranslation } from "react-i18next";

type Props = {
    columns: { key: string; label: string; w?: string }[];
    data: Array<Record<string, string | number>>;
    isLoading?: boolean;
    fixedHeader?: boolean;
    maxHeight?: string;
    striped?: boolean;
    hoverEffect?: boolean;
} & TableProps;

const TableCommon = ({
    columns,
    data,
    isLoading = false,
    fixedHeader = false,
    maxHeight = "500px",
    striped = true,
    hoverEffect = true,
    ...props
}: Props) => {
    const headerBg = useColorModeValue("gray.50", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const stripedRowBg = useColorModeValue("gray.50", "gray.700");
    const hoverBg = useColorModeValue("blue.50", "blue.900");

    const { t } = useTranslation();

    console.log(
        "check data: ",
        typeof data[0]?.questions === "string"
            ? JSON.parse(data[0].questions)
            : []
    );

    return (
        <Box
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            borderColor={borderColor}
            overflow="hidden"
        >
            <Box
                overflowX="auto"
                overflowY={fixedHeader ? "auto" : "visible"}
                maxH={fixedHeader ? maxHeight : undefined}
            >
                <Table {...props}>
                    <Thead
                        position={fixedHeader ? "sticky" : undefined}
                        top={0}
                        zIndex={1}
                        bg={headerBg}
                    >
                        <Tr>
                            {columns?.length > 0
                                ? columns.map(({ key, label, w }) => {
                                    return (
                                        <Th
                                            key={key}
                                            w={w}
                                            py={3}
                                            borderColor={borderColor}
                                        >
                                            {label}
                                        </Th>
                                    );
                                })
                                : null}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan={columns.length}>
                                    <Center py={4}>
                                        <Flex align="center">
                                            <Spinner size="sm" mr={2} />
                                            <Text>Đang tải dữ liệu...</Text>
                                        </Flex>
                                    </Center>
                                </Td>
                            </Tr>
                        ) : data?.length > 0 ? (
                            data?.map((item, index) => {
                                return (
                                    <Tr
                                        key={index}
                                        bg={
                                            striped && index % 2 === 1
                                                ? stripedRowBg
                                                : undefined
                                        }
                                        _hover={
                                            hoverEffect
                                                ? { bg: hoverBg }
                                                : undefined
                                        }
                                    >
                                        {columns?.map(
                                            (itemColumn, indexColumn) => {
                                                return (
                                                    <Td
                                                        key={indexColumn}
                                                        py={3}
                                                        borderColor={
                                                            borderColor
                                                        }
                                                    >
                                                        <Text noOfLines={5}>
                                                            {get(
                                                                item,
                                                                itemColumn.key
                                                            )
                                                                ?.toString()
                                                                .startsWith(
                                                                    "http"
                                                                ) ? (
                                                                <Image
                                                                    borderRadius={
                                                                        "10px"
                                                                    }
                                                                    maxHeight={
                                                                        "120px"
                                                                    }
                                                                    maxW={
                                                                        "140px"
                                                                    }
                                                                    alt=""
                                                                    src={get(
                                                                        item,
                                                                        itemColumn.key
                                                                    )?.toString()}
                                                                />
                                                            ) : (
                                                                get(
                                                                    item,
                                                                    itemColumn.key
                                                                )
                                                            )}
                                                        </Text>
                                                    </Td>
                                                );
                                            }
                                        )}
                                    </Tr>
                                );
                            })
                        ) : (
                            <Tr>
                                <Td colSpan={columns.length}>
                                    <Center py={6}>
                                        <Text color="gray.500">
                                            {t("noData")}
                                        </Text>
                                    </Center>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default TableCommon;
