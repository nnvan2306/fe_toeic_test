import { Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

type Props = {
    actionDelete?: () => void;
    actionUpdate?: () => void;
};
const ActionManage = ({ actionDelete, actionUpdate }: Props) => {
    const { t } = useTranslation();
    return (
        <HStack spacing={4} mt={4}>
            {actionDelete ? (
                <Button
                    leftIcon={<FaTrash />}
                    colorScheme="red"
                    variant="outline"
                    size="md"
                    _hover={{ bg: "red.50", borderColor: "red.500" }}
                    borderRadius="md"
                    onClick={actionDelete}
                >
                    {t("buttons.delete")}
                </Button>
            ) : null}

            {actionUpdate ? (
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
                    {t("buttons.update")}
                </Button>
            ) : null}
        </HStack>
    );
};

export default ActionManage;
