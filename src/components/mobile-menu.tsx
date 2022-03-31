import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
  Flex,
  MenuDivider,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FaHome, FaInfoCircle, FaDiscord, FaGithub } from 'react-icons/fa';

export const MobileMenu: FC = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FaHome />}>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem icon={<FaInfoCircle />}>
          <Link href="/coming-soon">Events</Link>
        </MenuItem>
        <MenuItem icon={<FaInfoCircle />}>
          <Link href="/ukraine">Ukraine</Link>
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
  );
};
