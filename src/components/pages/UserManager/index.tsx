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
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ManagerTemplate from "../../templates/ManagerTemplate";
import TableCommon from "../../organisms/TableCommon";
import TitleManage from "../../atoms/TitleManage";
import { useTranslation } from "react-i18next";
import { useGetUsers } from "../../../services/user/get-users";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { UserResponseType } from "../../../types/user";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ConfirmDelete from "../../organisms/ConfirmDelete";
import { useDeleteUser } from "../../../services/user/delete";
import { useUpdateUser } from "../../../services/user/update";

const UserManager = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const [idDelete, setIdDelete] = useState(0);
    const [dataUpdate, setDataUpdate] = useState<UserResponseType>();

    const { data, refetch } = useGetUsers({});
    const users = useMemo(
        () =>
            (data?.data || []).map((item: UserResponseType) => ({
                ...item,
                action: (
                    <HStack spacing={4} mt={4}>
                        <Button
                            leftIcon={<FaTrash />}
                            colorScheme="red"
                            variant="outline"
                            size="md"
                            _hover={{ bg: "red.50", borderColor: "red.500" }}
                            borderRadius="md"
                            disabled={item.role === "admin"}
                            onClick={() => {
                                setIdDelete(item.id);
                                onOpenDelete();
                            }}
                        >
                            Xóa
                        </Button>

                        <Button
                            leftIcon={<FiEdit />}
                            colorScheme="blue"
                            variant="solid"
                            size="md"
                            _hover={{ bg: "blue.600" }}
                            borderRadius="md"
                            boxShadow="sm"
                            disabled={item.role === "admin"}
                            onClick={() => {
                                setDataUpdate(item);
                                onOpen();
                            }}
                        >
                            Cập nhật
                        </Button>
                    </HStack>
                ),
            })),
        [data]
    );

    const { mutate, isPending: isPendingDelete } = useDeleteUser({
        mutationConfig: {
            onSuccess() {
                onCloseDelete();
                refetch();
            },
            onError() {},
        },
    });
    const handleDelete = useCallback(
        () => mutate(idDelete),
        [idDelete, mutate]
    );

    const update = useUpdateUser({
        mutationConfig: {
            onSuccess() {
                onClose();
                refetch();
            },
            onError() {},
        },
    });

    const handleUpdate = () => {
        if (dataUpdate) {
            update.mutate(dataUpdate);
        }
    };

    return (
        <ManagerTemplate>
            <Box px={5}>
                <TitleManage title={t("userManage.title")} />
                <TableCommon
                    columns={[
                        { key: "username", label: "Username", w: "20%" },
                        { key: "email", label: "Email", w: "20%" },
                        { key: "phone", label: "Phone", w: "20%" },
                        {
                            key: "gender",
                            label: "Gender",
                            w: "20%",
                        },
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
                        <ModalHeader>User detail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                <FormCommon title="Name">
                                    <Input
                                        value={dataUpdate?.username}
                                        onChange={(e) =>
                                            setDataUpdate((prev) => ({
                                                ...prev,
                                                username: e.target.value || "",
                                            }))
                                        }
                                    />
                                </FormCommon>
                                <FormCommon title="Email">
                                    <Input value={dataUpdate?.email} disabled />
                                </FormCommon>
                                <FormCommon title="Phone">
                                    <Input
                                        value={dataUpdate?.phone}
                                        onChange={(e) =>
                                            setDataUpdate((prev) => ({
                                                ...prev,
                                                phone: e.target.value || "",
                                            }))
                                        }
                                    />
                                </FormCommon>
                                <FormCommon title="Giới tính">
                                    <RadioGroup
                                        onChange={(e) =>
                                            setDataUpdate((prev) => ({
                                                ...prev,
                                                gender: e || "",
                                            }))
                                        }
                                        value={dataUpdate?.gender}
                                    >
                                        <Stack direction="row">
                                            <Radio value="male">Nam</Radio>
                                            <Radio value="female">Nữ</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormCommon>
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost" onClick={handleUpdate}>
                                Lưu thay đổi
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <ConfirmDelete
                    header="Confirm xóa User"
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

export default UserManager;

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
