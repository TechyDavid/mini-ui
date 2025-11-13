// examples/next/pages/_app.tsx
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '../../../packages/ui/src/ThemeProvider';
import '../../packages/ui/src/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
