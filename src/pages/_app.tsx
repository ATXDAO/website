// import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { UIProvider } from 'components/ui-provider';
import { AppProvider } from 'hooks/app-hooks';
import type { NextComponentType, NextPageContext } from 'next';
import type { Session } from 'next-auth';
// import { SessionProvider } from 'next-auth/react';
import type { NextRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { publicClient, webSocketPublicClient, connectors } from 'utils/clients';
import { WagmiConfig, createConfig } from 'wagmi';

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
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
  session: Session;
}

const App: FunctionComponent<AppRenderProps> = ({
  Component,
  pageProps,
  cookies,
  // session,
}) => (
  <WagmiConfig config={wagmiConfig}>
    {/* <SessionProvider session={session}> */}
    {/* <RainbowKitSiweNextAuthProvider enabled={false}> */}
    <UIProvider cookies={cookies}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </UIProvider>
    {/* </RainbowKitSiweNextAuthProvider> */}
    {/* </SessionProvider> */}
  </WagmiConfig>
);
export default App;

export { getServerSideProps } from 'components/ui-provider';
