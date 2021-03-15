import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
