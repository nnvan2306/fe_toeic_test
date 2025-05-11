export const HEADER_HEIGHT = 88;
export const COMMITMENT_HEIGHT = 45;

const styles = {
    global: {
        body: {
            color: "text",
            fontSize: 16,
            paddingTop: HEADER_HEIGHT + COMMITMENT_HEIGHT,
            bg: "background",
            minH: "100vh",
        },
        ":not(.chakra-dont-set-collapse) > .chakra-collapse": {
            overflow: "initial !important",
        },
    },
};

export default styles;
