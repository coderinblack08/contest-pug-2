import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NextPageContext } from "next";
import { useTokenStore } from "../store/auth";
import { createWithApollo } from "./createWithApollo";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const { accessToken, refreshToken } = useTokenStore.getState();

  return {
    headers: {
      ...headers,
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  };
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    headers: {
      cookie: (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) || "",
    },
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
