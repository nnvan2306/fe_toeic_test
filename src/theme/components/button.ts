import { ComponentStyleConfig } from "@chakra-ui/react";

const button: ComponentStyleConfig = {
    baseStyle: {
        fontWeight: 500,
        fontSize: "10px",
    },
    sizes: {
        xl: {
            fontSize: 14,
            h: "56px",
        },
        standard: {
            h: "52px",
        },
        regular: {
            h: "44px",
        },
        lg: {
            fontSize: 14,
        },
    },
    variants: {
        lightHover: {
            _hover: {
                opacity: 0.8,
                _disabled: {
                    bg: "",
                    opacity: 0.4,
                },
            },
        },
        border: {
            _hover: {
                opacity: 0.8,
            },
            border: "1px solid",
            borderColor: "paleGray",
        },
    },
};

export default button;
