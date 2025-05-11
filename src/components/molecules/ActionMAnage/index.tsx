import { Button, HStack } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

type Props = {
    actionDelete: () => void;
    actionUpdate: () => void;
};
const ActionManage = ({ actionDelete, actionUpdate }: Props) => {
    return (
        <HStack spacing={4} mt={4}>
            <Button
                leftIcon={<FaTrash />}
                colorScheme="red"
                variant="outline"
                size="md"
                _hover={{ bg: "red.50", borderColor: "red.500" }}
                borderRadius="md"
                onClick={actionDelete}
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
                onClick={actionUpdate}
            >
                Cập nhật
            </Button>
        </HStack>
    );
};

export default ActionManage;
