import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={
      {
        styles: {
          global: {
            body: {
              bg: 'gray.50',
            },
          },
        },
      }
    }>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
