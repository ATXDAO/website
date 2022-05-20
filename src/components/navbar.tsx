// import { Logo } from '../img/logo';
import { ColorModeSwitcher } from './color-mode-switcher';
import { MobileMenu } from './mobile-menu';
import { Signin } from './signin';
import { StandardMenu } from './standard-menu';
import { Wallet } from './wallet';
import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useAccount } from 'wagmi';

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar: FC<NavBarProps> = ({ width, paddingX }) => {
  const { data: accountData } = useAccount();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      paddingX={paddingX}
      height={['8vh', '10vh', '12vh']}
    >
      {width > 600 ? <StandardMenu width={width} /> : <MobileMenu />}
      <Flex alignItems="center">
        <ColorModeSwitcher justifySelf="flex-end" />
        {accountData?.address ? <Signin /> : null}
        <Wallet />
      </Flex>
    </Flex>
  );
};
