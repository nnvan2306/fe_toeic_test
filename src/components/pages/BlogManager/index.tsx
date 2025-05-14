import {
    Box,
    Button,
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
    useDisclosure,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import api from "../../../libs/axios";
import toast from "../../../libs/toast";
import { useDeleteBlog } from "../../../services/blog/delete";
import { useGetBlogs } from "../../../services/blog/get-blogs";
import { BlogResponseType } from "../../../types/blog";
import LoadingOverlay from "../../atoms/LoadingOverlay";
import TitleManage from "../../atoms/TitleManage";
import ActionManage from "../../molecules/ActionMAnage";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import TableCommon from "../../organisms/TableCommon";
import ManagerTemplate from "../../templates/ManagerTemplate";

const mdParser = new MarkdownIt(/* Markdown-it options */);

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
    const [content, setContent] = useState<string>("");
    const { data, refetch } = useGetBlogs({});
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState<string>("");

    const blogs = useMemo(
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    );

    const uploadFileMeditor = async (file: File) => {
        const res = await api.post(
            "/upload/single",
            {
                file: file,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    };

    const { mutate, isPending: isPendingDelete } = useDeleteBlog({
        mutationConfig: {
            onSuccess() {
                refetch();
                toast({
                    title: "Delete blog success",
                    status: "success",
                });
                onCloseDelete();
            },
            onError() {},
        },
    });
    const handleDelete = useCallback(
        () => mutate(idDelete),
        [idDelete, mutate]
    );

    const handleUploadFile = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const res = await uploadFileMeditor(file);
                setImagePreview(res.data);
            }
        },
        []
    );

    function handleEditorChange({ text }: { text: string }) {
        setContent(text);
    }

    const handleUploadFileMdEditor = async (file: File) => {
        const res = await uploadFileMeditor(file);
        return res.data;
    };

    const handleSubmit = async () => {
        if (!title || !content || !imagePreview) {
            toast({
                title: "Required fill all information",
                status: "error",
            });
        }

        if (dataUpdate) {
            const dataBuild = {
                title,
                content,
                thumbnail: imagePreview,
            };

            try {
                setIsLoading(true);
                await api.put(`/blog/${dataUpdate.id}`, dataBuild);
                toast({
                    title: "Update blog success",
                    status: "success",
                });
                refetch();
                onCloseDelete();
                setIsLoading(false);
                setDataUpdate(null);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error Update blog",
                    status: "error",
                });
            }
        } else {
            const dataBuild = {
                title,
                content,
                thumbnail: imagePreview,
            };

            try {
                setIsLoading(true);
                await api.post("/blog", dataBuild);
                toast({
                    title: "Create blog success",
                    status: "success",
                });
                refetch();
                onCloseDelete();
                setIsLoading(false);
                setDataUpdate(null);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error create blog",
                    status: "error",
                });
            }
        }
    };

    useEffect(() => {
        if (dataUpdate) {
            setTitle(dataUpdate.title);
            setContent(dataUpdate.content);
            setImagePreview(dataUpdate.thumbnail);
        } else {
            setTitle("");
            setContent("");
            setImagePreview("");
        }
    }, [dataUpdate]);

    return (
        <ManagerTemplate>
            <LoadingOverlay isLoading={isLoading} />
            <Box px={5}>
                <TitleManage title={t("blogManage.title")} />
                <HStack justifyContent="end" mb={2}>
                    <Button
                        onClick={() => {
                            setDataUpdate(null);
                            onOpen();
                        }}
                    >
                        New
                    </Button>
                </HStack>
                <TableCommon
                    columns={[
                        { key: "thumbnail", label: "Thumbnail", w: "20%" },
                        { key: "title", label: "Title", w: "20%" },
                        { key: "createdAt", label: "Created At", w: "20%" },
                        {
                            key: "action",
                            label: "",
                            w: "20%",
                        },
                    ]}
                    data={blogs}
                />

                <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {dataUpdate ? "Blog Detail" : "New Blog"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormCommon title="Title">
                                <Input
                                    placeholder="Title blog...."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormCommon>
                            <br />
                            <FormCommon
                                title="Thumbnail"
                                action={() => refInput.current?.click()}
                            >
                                <input
                                    type="file"
                                    hidden
                                    ref={refInput}
                                    onChange={(e) => handleUploadFile(e)}
                                />
                                {imagePreview ? (
                                    <Image alt="thumbnail" src={imagePreview} />
                                ) : (
                                    <Box
                                        h="200px"
                                        border="1px dashed"
                                        borderColor="#ccc"
                                        rounded={6}
                                    ></Box>
                                )}
                            </FormCommon>
                            <br />
                            <FormCommon title="content">
                                <MdEditor
                                    onImageUpload={handleUploadFileMdEditor}
                                    placeholder="Write content blog...."
                                    style={{ height: "500px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    value={content}
                                />
                            </FormCommon>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    onClose();
                                    setDataUpdate(null);
                                    setTitle("");
                                    setContent("");
                                    setImagePreview("");
                                }}
                            >
                                Close
                            </Button>
                            <Button variant="ghost" onClick={handleSubmit}>
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
                {action ? (
                    <Text
                        onClick={action}
                        background={"#ee4d2d"}
                        padding={"6px 10px"}
                        borderRadius={"10px"}
                        marginBottom={2}
                        color={"white"}
                    >
                        Upload
                    </Text>
                ) : null}
            </HStack>
            {children}
        </Box>
    );
};
