import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { UIProvider } from '../components/UIProvider';

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
  <UIProvider cookies={cookies}>
    <Component {...pageProps} />
  </UIProvider>
);

export default App;

export { getServerSideProps } from '../components/UIProvider';
