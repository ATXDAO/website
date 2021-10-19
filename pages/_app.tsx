import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { UIProvider } from 'components/ui-provider';
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from '../getLibrary';

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
  <Web3ReactProvider getLibrary={getLibrary}>
    <UIProvider cookies={cookies}>
      <Component {...pageProps} />
    </UIProvider>
  </Web3ReactProvider>
);

export default App;

export { getServerSideProps } from 'components/ui-provider';
