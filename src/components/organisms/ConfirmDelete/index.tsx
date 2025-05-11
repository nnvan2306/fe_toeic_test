import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import { useRef } from "react";

type Props = {
    header: string;
    title: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onDelete: () => void;
    isLoading?: boolean;
};
const ConfirmDelete = ({
    header,
    title,
    isOpen,
    onClose,
    onDelete,
    isLoading,
}: Props) => {
    const cancelRef = useRef(null);
    const handleDelete = () => {
        onDelete();
    };
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {header}
                        </AlertDialogHeader>

                        <AlertDialogBody>{title}</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                                disabled={isLoading}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default ConfirmDelete;
