import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.NODE_ENV === "production" && (
            <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-160862205-1`} />
          )}
          {process.env.NODE_ENV === "production" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-160862205-1', {
              page_path: window.location.pathname,
            });
          `
              }}
            />
          )}

          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i&display=swap"
            rel="stylesheet"
          ></link>
          <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
          <link href="https://fonts.googleapis.com/css?family=Slabo+27px&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Arimo&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Proza+Libre:400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Merriweather:300,400,700,900|Scope+One&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Raleway:300,400,500,600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:200,300,400,500,600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:200,300,400,500,600,700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" href="https://use.typekit.net/wlu2qmv.css"></link>
          <link rel="stylesheet" href="https://use.typekit.net/wlu2qmv.css"></link>

          {/* Facebook Pixel */}
          {process.env.NODE_ENV === "production" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '516055865704023');
              fbq('track', 'PageView');
          `
              }}
            />
          )}

          {process.env.NODE_ENV === "production" && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
            <img 
              height="1"
              width="1"
              style={"display":"none"}
              src="https://www.facebook.com/tr?id=516055865704023&ev=PageView&noscript=1"
            />
          `
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://js.stripe.com/v3/" />
        </body>
      </Html>
    );
  }
}
