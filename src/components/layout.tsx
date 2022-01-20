import { Logo } from './logo';
import { Wallet } from './wallet';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Container,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/color-mode-switcher';
import { useFireworks } from 'hooks/app-hooks';
import Head from 'next/head';
import { FC, ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  connected: boolean;
  canToggleHeader?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  connected,
  canToggleHeader = false,
  title = 'This is the default title',
}) => {
  const [toggleHeader, setToggleHeader] = useState(true);
  const [fireworks] = useFireworks();

  return (
    <>
      {fireworks && (
        <Box className="pyro">
          <Box className="before" />
          <Box className="after" />
        </Box>
      )}
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {fireworks && <link rel="stylesheet" href="/css/fireworks.css" />}
      </Head>
      <Container maxWidth="1200px">
        <Flex py={4} justifyContent="flex-end" alignItems="center">
          <Center hidden={!connected || !toggleHeader}>
            <Logo
              visibility={['hidden', 'visible']}
              boxSize={['0', '48px']}
              fill={useColorModeValue('gray.800', 'gray.100')}
              mr={2}
            />
            <Text fontSize={['2xl', '3xl']}>ATX DAO</Text>
          </Center>
          <Spacer />
          <IconButton
            size="sm"
            variant="ghost"
            icon={toggleHeader ? <ArrowUpIcon /> : <ArrowDownIcon />}
            hidden={!canToggleHeader}
            aria-label="toggle header"
            onClick={() => setToggleHeader(!toggleHeader)}
          />
          <Spacer />
          <Center hidden={!toggleHeader}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Wallet />
          </Center>
        </Flex>
        {children}
      </Container>
    </>
  );
};
