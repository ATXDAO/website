/* eslint-disable no-console */
import { Button, Container, Flex } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ColorModeSwitcher } from 'components/color-mode-switcher';
import { useEagerConnect, useENSName } from 'hooks/web3';
import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { formatEtherscanLink, shortenHex } from '../util';
import Account from './account';

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = 'This is the default title',
}) => {
  const { active, account, chainId, deactivate } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();
  const ENSName = useENSName(account || '');

  async function disconnect(): Promise<void> {
    try {
      await deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="1200px">
        <header>
          <Flex py={4} justifyContent="flex-end" alignItems="center">
            <Flex justifyContent="space-between" alignItems="center">
              <nav />
            </Flex>

            {active ? (
              <Button onClick={disconnect}>Disconnect</Button>
            ) : (
              <Account triedToEagerConnect={triedToEagerConnect} />
            )}
            {active ? (
              <Button>
                <a
                  {...{
                    href: formatEtherscanLink('Account', [
                      chainId || 1,
                      account || '',
                    ]),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }}
                >
                  {ENSName || `${shortenHex(account || '', 4)}`}
                </a>
              </Button>
            ) : null}
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </header>
        {children}
      </Container>
    </div>
  );
};
