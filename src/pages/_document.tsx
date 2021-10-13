import { Html, Head, Main, NextScript } from 'next/document';

const _document = () => {
  return (
    <Html lang='ja'>
      <Head>
        <link rel='shortcut icon' href='/favicons/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          sizes='192x192'
          href='/favicons/android-chrome-192x192.png'
        />
        <link rel='icon' sizes='32x32' href='/favicons/favicon.ico' />
        <link rel='mask-icon' href='/favicons/favicon.ico' />

        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
