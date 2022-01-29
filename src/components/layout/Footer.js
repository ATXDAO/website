import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { FaDiscord, FaGithub } from "react-icons/fa";

function Footer({width, paddingX}){
    const breakpoint = 600;

    return (
        <Flex
            justifyContent={width < breakpoint ? "center" : "space-between"}
            flexDirection={width < breakpoint ? "column" : "row"}
            paddingX={paddingX}
            paddingY="2rem"
            bg="#282d30"
            gap="2rem"
        >
            <Box textAlign={width < breakpoint ? "center" : "left"}>
                <Text>Copyright 2022 &copy; ATXDAO. All rights reserved.</Text>
                <Text>Send us a message with any questions on discord or twitter.</Text>
            </Box>

            <Flex 
                justifyContent={width < 600 ? "center" : "left"}
                alignItems="center"
                gap="1rem"
            >
                <Link href="https://discord.gg/3uGPbZhk3U" target="_blank">
                    <Button variant="ghost">
                        <FaDiscord fontSize="2rem" />
                    </Button>
                </Link>
                <Link href="https://github.com/atxdao" target="_blank">
                    <Button variant="ghost">
                        <FaGithub fontSize="2rem" />
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )
}

export default Footer;