import {
  ChakraProvider,
  cookieStorageManager,
  extendTheme,
  localStorageManager,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import chakraTheme from "../util/chakraTheme"

const theme = extendTheme(chakraTheme);

interface ChakraProps {
  cookies: string;
  children: ReactNode;
}

export function UIProvider({
  children,
  cookies = '',
}: ChakraProps): JSX.Element {
  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
    >
      {children}
    </ChakraProvider>
  );
}

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>;

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
}
