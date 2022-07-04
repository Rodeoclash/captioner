import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
};

export default extendTheme(theme);
