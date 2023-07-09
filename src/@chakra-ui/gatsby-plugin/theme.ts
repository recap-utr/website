import {
  extendTheme,
  type ComponentSingleStyleConfig,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const Link: ComponentSingleStyleConfig = {
  baseStyle: {
    color: "teal.500",
  },
};

export default extendTheme({
  config,
  components: {
    Link,
  },
});
