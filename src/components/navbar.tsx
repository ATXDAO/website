// import { Logo } from '../img/logo';
import { ColorModeSwitcher } from './color-mode-switcher';
import { MobileMenu } from './mobile-menu';
// import { Signin } from './signin';
import { StandardMenu } from './standard-menu';
import { Wallet } from './wallet';
import { Flex } from '@chakra-ui/react';
// import { useIsMounted } from 'hooks/app-hooks';
import { FC } from 'react';

interface NavBarProps {
  width: number;
  paddingX?: string[];
}

export const NavBar: FC<NavBarProps> = ({ width, paddingX }) => {
  // const isMounted = useIsMounted();

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
        {/* {isMounted ? <Signin /> : null} */}
        <Wallet />
      </Flex>
    </Flex>
  );
};
