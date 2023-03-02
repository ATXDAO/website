import { UIProvider } from 'components/ui-provider';
import { providers } from 'ethers';
import { AppProvider } from 'hooks/app-hooks';
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { WagmiConfig, createClient } from 'wagmi';
import { mainnet, sepolia, goerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Get environment variables
const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;
const chains = [mainnet, sepolia, goerli];

const isChainSupported = (chainId?: number): boolean =>
  chains.some((x) => x.id === chainId);

const wagmiClient = createClient({
  autoConnect: true,
  connectors() {
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
    ];
  },
  provider({ chainId }) {
    return providers.getDefaultProvider(
      isChainSupported(chainId) ? chainId : 1,
      {
        alchemy,
        etherscan,
        infuraId,
      }
    );
  },
  webSocketProvider({ chainId }) {
    return isChainSupported(chainId)
      ? new providers.InfuraWebSocketProvider(chainId, infuraId)
      : undefined;
  },
});

export interface AppRenderProps {
  pageProps: Record<string, unknown>;
  err?: Error;
  Component: NextComponentType<
    NextPageContext,
    AppRenderProps,
    Record<string, unknown>
  >;
  cookies: string;
  router: NextRouter;
}

const App: FunctionComponent<AppRenderProps> = ({
  Component,
  pageProps,
  cookies,
}) => (
  <WagmiConfig client={wagmiClient}>
    <UIProvider cookies={cookies}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </UIProvider>
  </WagmiConfig>
);

export default App;

export { getServerSideProps } from 'components/ui-provider';
