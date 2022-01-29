import { Flex, Button, Link } from "@chakra-ui/react";
import { FaDiscord, FaGithub } from "react-icons/fa";

function StandardMenu({width}){
    return (
        <Flex gap={["0", "0", "0", "0.75rem", "1rem"]}>
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
            <Link href="/">
                <Button variant="ghost">
                    Home
                </Button>
            </Link>
            <Link href="/events">
                <Button variant="ghost">
                    Events
                </Button>
            </Link>
            <Link href="/blog">
                <Button variant="ghost">
                    Blog
                </Button>
            </Link>
            <Link href="/store">
                <Button variant="ghost">
                    Store
                </Button>
            </Link>
        </Flex>
    )
}

export default StandardMenu;