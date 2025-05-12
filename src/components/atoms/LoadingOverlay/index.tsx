import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { useGlobalContext } from "../../../contexts/GlobalContext";

type Props = {
    isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: Props) => {
    const { isLoadingOverlay } = useGlobalContext();

    const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

    return (
        <>
            {(isLoading || isLoadingOverlay) &&
                createPortal(
                    <Box
                        w="100vw"
                        h="100vh"
                        bg="rgba(0,0,0,0.3)"
                        position="fixed"
                        top={0}
                        right={0}
                        bottom={0}
                        left={0}
                        zIndex={99999}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            width="200px"
                            height="200px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                "#spinner": {
                                    fontSize: "1.875rem",
                                    lineHeight: "2.25rem",
                                    animation: `${spin} 1s linear infinite`,
                                    color: "brand",
                                },
                            }}
                        >
                            <ClipLoader
                                size={150}
                            />
                        </Box>
                    </Box>,
                    document.body
                )}
        </>
    );
};

export default LoadingOverlay;
