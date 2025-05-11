import {
    Box,
    Button,
    Grid,
    GridItem,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import { useTranslation } from "react-i18next";
import TitleManage from "../../atoms/TitleManage";
import TableCommon from "../../organisms/TableCommon";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import ActionManage from "../../molecules/ActionMAnage";
import { BlogResponseType } from "../../../types/blog";
import { useGetBlogs } from "../../../services/blog/get-blogs";
import { useDeleteBlog } from "../../../services/blog/delete";

const BlogManager = () => {
    const { t } = useTranslation();
    const refInput = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const [idDelete, setIdDelete] = useState(0);
    const [dataUpdate, setDataUpdate] = useState<BlogResponseType | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    const { data, refetch } = useGetBlogs({});
    const users = useMemo(
        () =>
            (data?.data || []).map((item: BlogResponseType) => ({
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

    const { mutate, isPending: isPendingDelete } = useDeleteBlog({
        mutationConfig: {
            onSuccess() {
                refetch();
            },
            onError() {},
        },
    });
    const handleDelete = useCallback(
        () => mutate(idDelete),
        [idDelete, mutate]
    );

    const handleUploadFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setImagePreview(URL.createObjectURL(file));
                const formData = new FormData();
                formData.append("images", file);
                formData.append("folderName", "flash_sale");
            }
        },
        []
    );

    return (
        <ManagerTemplate>
            <Box px={5}>
                <TitleManage title={t("blogManage.title")} />
                <HStack justifyContent="end" mb={2}>
                    <Button onClick={onOpen}>New</Button>
                </HStack>
                <TableCommon
                    columns={[
                        { key: "title", label: "Title", w: "20%" },

                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={users}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {dataUpdate ? "Blog Detail" : "New Blog"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <FormCommon title="Title">
                                    <Input />
                                </FormCommon>

                                <GridItem rowSpan={2}>
                                    <FormCommon
                                        title="Thumbnail"
                                        action={() => refInput.current?.click()}
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            ref={refInput}
                                            onChange={(e) =>
                                                handleUploadFile(e)
                                            }
                                        />
                                        {imagePreview ? (
                                            <Image
                                                alt="thumbnail"
                                                src={imagePreview}
                                            />
                                        ) : (
                                            <Box
                                                h="200px"
                                                border="1px dashed"
                                                borderColor="#ccc"
                                                rounded={6}
                                            ></Box>
                                        )}
                                    </FormCommon>
                                </GridItem>

                                <FormCommon title="content">
                                    <Textarea />
                                </FormCommon>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost">
                                {" "}
                                {dataUpdate ? "Lưu thay đổi" : "Tạo"}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Confirm xóa Blog"
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

export default BlogManager;

type FormCommonProps = {
    children: ReactNode;
    title: string;
    action?: () => void;
};
const FormCommon = ({ title, children, action }: FormCommonProps) => {
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
                {action ? <Text onClick={action}>Upload</Text> : null}
            </HStack>
            {children}
        </Box>
    );
};
