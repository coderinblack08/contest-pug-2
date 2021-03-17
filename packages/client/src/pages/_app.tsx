import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "../components/Provider";
import "../styles/globals.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="preload"
          href="/fonts/eudoxus-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
