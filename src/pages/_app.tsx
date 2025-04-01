import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <ContentfulLivePreviewProvider
        locale={router.locale || 'en-US'}
        enableInspectorMode={pageProps.draftMode}
        enableLiveUpdates={pageProps.draftMode}
        debugMode={true}
      >
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
      </ContentfulLivePreviewProvider>
    </>
  );
}
