import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Wrapper } from "../components/other/Wrapper";
import "../styles/fonts.css";
import "../styles/globals.css";
import { fetcher } from "../utils/fetcher";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      queryFn: fetcher,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://contestpug.now.sh"
      : "http://localhost:3000/";

  return (
    <QueryClientProvider client={queryClient}>
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
