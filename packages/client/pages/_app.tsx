import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React from "react";
import NProgress from "nprogress";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { Wrapper } from "../components/other/Wrapper";
import { fetcher } from "../utils/fetcher";
import "../styles/fonts.css";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { Router } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      queryFn: fetcher,
    },
  },
});

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://contestpug.now.sh"
      : "http://localhost:3000/";

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <DefaultSeo
        title="Contest Pug"
        description="🤙 🌸 The smarter way to host online competitions."
        canonical={url}
        openGraph={{
          url,
          type: "website",
          locale: "en_IE",
          title: "Contest Pug",
          description: "Delivering accurate, justifiable news daily.",
          images: [], // TODO: Add og-image
        }}
        additionalMetaTags={[
          {
            content: "contest, competition, tournament, testing, contest pug",
            property: "keywords",
          },
          {
            content: "width=device-width, initial-scale=1.0",
            property: "viewport",
          },
        ]}
      />
      <Hydrate state={pageProps.dehydratedState}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
