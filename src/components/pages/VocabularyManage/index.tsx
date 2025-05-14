import {
    Box,
    Button,
    Grid,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TableCommon from "../../organisms/TableCommon";
import { useGetVocabularys } from "../../../services/vocabulary/get-all";
import { ReactNode, useEffect, useMemo, useState } from "react";
import ActionManage from "../../molecules/ActionMAnage";
import { VocabularyResponseType } from "../../../types/vocabulary";
import TitleManage from "../../atoms/TitleManage";
import { useCreateVocabulary } from "../../../services/vocabulary/create";
import toast from "../../../libs/toast";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { getAxiosError } from "../../../libs/axios";
import { useUpdateVocabulary } from "../../../services/vocabulary/update";
import { useDeleteVocabulary } from "../../../services/vocabulary/delete";
import { useGetCategoris } from "../../../services/category/get-all";
import { CategoryResponseType } from "../../../types/category";
import { useTranslation } from "react-i18next";

const VocabularyManage = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const [idDelete, setIdDelete] = useState(0);
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [example, setExample] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [dataUpdate, setDataUpdate] = useState<VocabularyResponseType | null>(
        null
    );
    const [cateQuery, setCateQuery] = useState(0);

    const { data, refetch } = useGetVocabularys({ categoryId: cateQuery });
    const vocabularies = useMemo(
        () =>
            (data?.data || []).map((item: VocabularyResponseType) => ({
                ...item,
                action: (
                    <ActionManage
                        actionDelete={() => {
                            setIdDelete(item.id);
                            onOpenDelete();
                        }}
                        actionUpdate={() => {
                            setDataUpdate(item);
                            onOpen();
                        }}
                    />
                ),
            })),
        [data]
    );

    const { data: dataCateGories } = useGetCategoris({});
    const categories = useMemo(
        () =>
            (dataCateGories?.data || []).map(
                (item: CategoryResponseType) => item
            ),
        [dataCateGories]
    );

    const handleReset = () => {
        setWord("");
        setDefinition("");
        setExample("");
        setCategoryId(0);
    };

    const { mutate, isPending } = useCreateVocabulary({
        mutationConfig: {
            onSuccess() {
                handleReset();
                onClose();
                toast({
                    status: "success",
                    title: "Tạo danh mục thành công",
                });
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const { mutate: update, isPending: isPendingUpdate } = useUpdateVocabulary({
        mutationConfig: {
            onSuccess() {
                handleReset();
                setDataUpdate(null);
                onClose();
                toast({
                    status: "success",
                    title: "Cập nhật danh mục thành công",
                });
                refetch();
            },
            onError(error) {
                toast({
                    status: "error",
                    title: getAxiosError(error),
                });
            },
        },
    });

    const { mutate: deleteCategory, isPending: isPendingDelete } =
        useDeleteVocabulary({
            mutationConfig: {
                onSuccess() {
                    onCloseDelete();
                    toast({
                        status: "success",
                        title: "Xóa danh mục thành công",
                    });
                    refetch();
                },
                onError(error) {
                    toast({
                        status: "error",
                        title: getAxiosError(error),
                    });
                },
            },
        });

    const handleDelete = () => {
        if (idDelete) {
            deleteCategory(idDelete);
        }
    };

    const handleSubmit = () => {
        if (!word || !definition || !example) {
            toast({
                status: "warning",
                title: "Vui lòng nhập đủ thông tin",
            });
            return;
        }
        if (dataUpdate) {
            update({ ...dataUpdate, word, definition, example, categoryId });
        } else {
            mutate({ word, definition, example, categoryId });
        }
    };

    useEffect(() => {
        if (dataUpdate) {
            setWord(dataUpdate.word);
            setDefinition(dataUpdate.definition);
            setExample(dataUpdate.example);
            setCategoryId(dataUpdate.categoryId);
        } else {
            handleReset();
        }
    }, [dataUpdate]);

    return (
        <ManagerTemplate>
            {/* <LoadingOverlay isLoading={isLoading} /> */}
            <Box>
                <TitleManage title={"Vocabulary"} />
                <HStack justifyContent="space-between" mb={2}>
                    <Select
                        value={cateQuery}
                        onChange={(e) => setCateQuery(Number(e.target.value))}
                        placeholder="Choose category"
                        w={300}
                    >
                        {categories?.length
                            ? categories.map((item: CategoryResponseType) => {
                                  return (
                                      <option key={item.id} value={item.id}>
                                          {item.title}
                                      </option>
                                  );
                              })
                            : null}
                    </Select>
                    <Button
                        onClick={() => {
                            onOpen();
                            setDataUpdate(null);
                        }}
                    >
                        {t("buttons.new")}
                    </Button>
                </HStack>

                <TableCommon
                    columns={[
                        { key: "word", label: "word", w: "50%" },

                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={vocabularies}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {dataUpdate
                                ? "Vocabulary Detail"
                                : "New Vocabulary"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box w="100%">
                                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                    <FormCommon title="Word">
                                        <Input
                                            value={word}
                                            onChange={(e) =>
                                                setWord(e.target.value)
                                            }
                                        />
                                    </FormCommon>
                                    <FormCommon title="Definition">
                                        <Input
                                            value={definition}
                                            onChange={(e) =>
                                                setDefinition(e.target.value)
                                            }
                                        />
                                    </FormCommon>
                                    <FormCommon title="Example">
                                        <Input
                                            value={example}
                                            onChange={(e) =>
                                                setExample(e.target.value)
                                            }
                                        />
                                    </FormCommon>
                                    <FormCommon title="Category">
                                        <Select
                                            value={categoryId}
                                            onChange={(e) =>
                                                setCategoryId(
                                                    Number(e.target.value)
                                                )
                                            }
                                            placeholder="Choose category"
                                        >
                                            {categories?.length
                                                ? categories.map(
                                                      (
                                                          item: CategoryResponseType
                                                      ) => {
                                                          return (
                                                              <option
                                                                  key={item.id}
                                                                  value={
                                                                      item.id
                                                                  }
                                                              >
                                                                  {item.title}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </Select>
                                    </FormCommon>
                                </Grid>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    onClose();
                                    if (dataUpdate) {
                                        setDataUpdate(null);
                                        handleReset();
                                    }
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleSubmit}
                                disabled={isPending || isPendingUpdate}
                            >
                                {" "}
                                {dataUpdate ? "Lưu thay đổi" : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Confirm xóa Vocabulary"
                    title="Bạn chắc chắn muốn xóa?, hành động này không thể khôi phục."
                    isOpen={isOpenDelete}
                    onOpen={onOpenDelete}
                    onClose={onCloseDelete}
                    onDelete={handleDelete}
                    isLoading={isPendingDelete}
                />
            </Box>
        </ManagerTemplate>
    );
};

export default VocabularyManage;

type FormCommonProps = {
    children: ReactNode;
    title: string;
};
const FormCommon = ({ title, children }: FormCommonProps) => {
    return (
        <Box>
            <HStack justifyContent="space-between">
                <Text
                    fontSize={16}
                    fontWeight={500}
                    mb={1}
                    textTransform="capitalize"
                >
                    {title}
                </Text>
            </HStack>
            {children}
        </Box>
    );
};
