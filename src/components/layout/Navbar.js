import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Logo } from "../../img/logo";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import StandardMenu from "./Menu/StandardMenu";
import MobileMenu from "./Menu/MobileMenu";

function Navbar({width, paddingX}){
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            paddingX={paddingX}
            height={["8vh", "10vh", "12vh"]}
        >
            <Flex
                alignItems="center"
                gap={["0.5rem", "1rem"]}
            >
                <Logo
                    boxSize={['40px', '60px']}
                    fill={'gray.100'}
                />
                <Text fontSize="24px">ATX DAO</Text>
            </Flex>

            {width > 600 ? (
                <StandardMenu width={width} />
            ):(
                <MobileMenu />
            )}
        </Flex>
    )
}

export default Navbar;
