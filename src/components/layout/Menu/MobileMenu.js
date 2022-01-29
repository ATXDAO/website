import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link, Flex, MenuDivider } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHome, FaInfoCircle, FaBloggerB, FaStore, FaUsers, FaDiscord, FaGithub } from "react-icons/fa";

function MobileMenu(){
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <MenuList>
                <MenuItem icon={<FaHome />}>
                    <Link href="/">Home</Link>
                </MenuItem>
                <MenuItem icon={<FaInfoCircle />}>
                    <Link href="/about">About</Link>
                </MenuItem>
                <MenuItem icon={<FaBloggerB />}>
                    <Link href="/blog">Blog</Link>
                </MenuItem>
                <MenuItem icon={<FaStore />}>
                    <Link href="/store">Store</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                    <Flex gap="1rem">
                        <Link href="https://discord.gg/3uGPbZhk3U" target="_blank">
                            <FaDiscord fontSize="2rem" />
                        </Link>
                        <Link href="https://github.com/atxdao" target="_blank">
                            <FaGithub fontSize="2rem" />
                        </Link>
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MobileMenu;