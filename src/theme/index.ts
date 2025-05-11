import styles from "./styles";
import fonts from "./foundations/fonts";
import colors from "../constants/colors";
import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";

const overrides = {
    colors,
    fonts,
    styles,
    components: { Button },
};

export default extendTheme(overrides);
