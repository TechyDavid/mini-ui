// examples/next/pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import { generateCssVarsStyleTag } from '../../../packages/ui/src/ssr';
import { defaultLightTheme } from '../../../packages/ui/src/theme';

class MyDocument extends Document<{ cssVars?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // For demo we inject defaultLightTheme. In a real app, read cookie or user preference here.
    const cssVarsTag = generateCssVarsStyleTag(defaultLightTheme);
    return { ...initialProps, cssVars: cssVarsTag };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Inject server-rendered theme css variables to prevent flash */}
          <div dangerouslySetInnerHTML={{ __html: this.props.cssVars ?? '' }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
