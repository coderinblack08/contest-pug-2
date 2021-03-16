import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import "../styles/globals.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="preload"
          href="/fonts/EudoxusSans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
