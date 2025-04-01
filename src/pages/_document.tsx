import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

// Need to create a custom _document because i18n support is not compatible with `next export`.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <Partytown debug={true} forward={['dataLayer.push']} /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={'anonymous'} // default state, types prevent true/false
          />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV@100..900,0.5&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
          <Main />

          <Script
            id={'munchkinScript'}
            strategy={'afterInteractive'}
            onLoad={() => {
              console.log('Munchkin has loaded');
            }}
          >
            {`window.loadMarketoTracking = function(){
              Munchkin = undefined;
              (function(d,s,i,r) {
                var el = d.getElementById(i);
                if (el){return;}
                var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
                n.id=i;n.src='https://862-jiq-698.mktoweb.com/munchkin.js';
                n.onreadystatechange = function() {
                  if (this.readyState == 'complete' || this.readyState == 'loaded') {
                      Munchkin.init("862-JIQ-698", {"cookieLifeDays":365});
                  }
                };
                n.onload = function() {
                  Munchkin.init("862-JIQ-698",{"cookieLifeDays":365});
                };
                e.parentNode.insertBefore(n, e);
              })(document,"script","munchkin",300000);
            }
            loadMarketoTracking();`}
          </Script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
