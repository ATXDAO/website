import { Logo } from './logo';
import { Wallet } from './wallet';
import {
  Center,
  Container,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/color-mode-switcher';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  connected: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  connected,
  title = 'This is the default title',
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="1200px">
        <Flex py={4} justifyContent="flex-end" alignItems="center">
          <Center hidden={!connected}>
            <Logo
              boxSize="32px"
              fill={useColorModeValue('gray.800', 'gray.100')}
              mr={2}
            />
            <Text fontSize="3xl">ATX DAO</Text>
          </Center>
          <Spacer />
          <Center>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Wallet />
          </Center>
        </Flex>
        {children}
      </Container>
    </div>
  );
};
