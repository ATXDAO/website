import { UIProvider } from 'components/ui-provider';
import { providers } from 'ethers';
import { AppProvider } from 'hooks/app-hooks';
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { defaultChains, WagmiProvider, createWagmiClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Get environment variables
const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

// Pick chains
const supportedChainIds = new Set([1, 3, 4]); // mainnet, ropsten

const chains = defaultChains.filter((_chain) =>
  supportedChainIds.has(_chain.id)
);

const defaultChain = defaultChains.find((chain) => chain.id === 1);

const isChainSupported = (chainId?: number): boolean =>
  chains.some((x) => x.id === chainId);

const wagmiClient = createWagmiClient({
  autoConnect: true,
  connectors({ chainId }) {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      defaultChain?.rpcUrls[0];
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
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
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
  <WagmiProvider client={wagmiClient}>
    <UIProvider cookies={cookies}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </UIProvider>
  </WagmiProvider>
);

export default App;

export { getServerSideProps } from 'components/ui-provider';
