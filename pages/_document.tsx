import { ColorModeScript } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import fonts from 'styles/font-face';

export default class Document extends NextDocument {
  static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return NextDocument.getInitialProps(ctx);
  }

  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <Global styles={fonts} />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
