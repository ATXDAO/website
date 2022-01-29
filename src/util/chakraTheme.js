import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat"

const chakraTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
        body: {
            bg: "#1a202c",
            color: "#fff",
            padding: 0,
            margin: 0,
        }
    }
  },
  fonts: {
    body: "Montserrat",
  },
  colors: {
    brand: "#d76514",
    background: "#1a202c"
  },
  components: {
        Heading: {
            baseStyle: {
                fontFamily: "Montserrat",
                colorScheme: "grey"
            },
            variants: {
                pop: {
                    fontSize: ["4xl", "6xl", "7xl"],
                    color: "transparent",
                    // textShadow: "5px 5px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -5px 5px 0 #fff, 5px 5px 0 #fff",
                    "-webkit-text-stroke": "1px #fff;"
                }
            }
        },
        Link: {
            baseStyle: {
                _hover: {
                    textDecoration: "none"
                }
            },
        },
    },
});

export default chakraTheme;
