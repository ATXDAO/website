// import { Logo } from '../img/logo';
import { ColorModeSwitcher } from './color-mode-switcher';
import { MobileMenu } from './mobile-menu';
import { Profile } from './signin';
import { StandardMenu } from './standard-menu';
import { Wallet } from './wallet';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar: FC<NavBarProps> = ({ width, paddingX }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      paddingX={paddingX}
      height={['8vh', '10vh', '12vh']}
    >
      {width > 600 ? <StandardMenu width={width} /> : <MobileMenu />}
      <Flex alignItems="center" gap={['0.5rem', '1rem']}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Wallet />
        <Profile />
      </Flex>
    </Flex>
  );
};
