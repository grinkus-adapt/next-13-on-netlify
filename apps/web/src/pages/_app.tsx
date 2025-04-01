import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const routeTimeout = useRef<any>(null);

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
      if (url !== window.location.pathname) {
        routeTimeout.current = setTimeout(() => {
          window.location.href = url;
        }, 1000);
        NProgress.start();
      }
    };

    const handleStop = () => {
      clearTimeout(routeTimeout.current);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

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
