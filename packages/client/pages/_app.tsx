import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/fonts.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetcher } from "../utils/fetcher";
import { Wrapper } from "../components/other/Wrapper";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Contest Pug</title>
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </QueryClientProvider>
  );
}

export default MyApp;
