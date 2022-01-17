/* eslint-disable no-console */
import { Center, Container, Flex, Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/color-mode-switcher';
import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Wallet } from './wallet';

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
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
          <Flex justifyContent="space-between" alignItems="center">
            <nav />
          </Flex>
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
