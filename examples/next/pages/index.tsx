// examples/next/pages/index.tsx
import React from 'react';
import { Button, Box, useTheme } from '../../../packages/ui/src';

export default function Home() {
  const { toggleColorScheme } = useTheme();

  return (
    <Box as="main" style={{ padding: 24 }}>
      <h1>Mini UI — Demo</h1>
      <p>Server-side injected theme variables, client hydration safe.</p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
        <Button onClick={() => alert('clicked')}>Primary</Button>
        <Button variant="outline" onClick={() => alert('outline')}>
          Outline
        </Button>
        <Button variant="ghost" onClick={() => alert('ghost')}>
          Ghost
        </Button>
        <Button variant="link" onClick={() => alert('link')}>
          Link
        </Button>
        <Button onClick={() => toggleColorScheme()}>Toggle Color</Button>
      </div>
    </Box>
  );
}
