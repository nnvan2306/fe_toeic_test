import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast: toastChakra } = createStandaloneToast();

const toast = ({
    status,
    title = "",
    description = "",
    ...props
}: UseToastOptions) => {
    return toastChakra({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
        position: "top-right",
        ...props,
    });
};

export default toast;
