import { Container, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/color-mode-switcher';
import Head from 'next/head';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container maxWidth="1200px">
      <header>
        <Flex py={4} justifyContent="space-between" alignItems="center">
          <Flex justifyContent="space-between" alignItems="center">
            <nav />
          </Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </header>
      {children}
    </Container>
  </div>
);
