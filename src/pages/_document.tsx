import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="global-loader">
          <div className="whirly-loader"></div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
