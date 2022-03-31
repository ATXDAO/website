// import { Logo } from '../img/logo';
import { ColorModeSwitcher } from './color-mode-switcher';
import { MobileMenu } from './mobileMenu';
import { StandardMenu } from './standardMenu';
import { Wallet } from './wallet';
import { Flex, Text } from '@chakra-ui/react';
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
      </Flex>
    </Flex>
  );
};
