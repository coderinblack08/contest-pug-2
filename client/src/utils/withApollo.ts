import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedContest, TypedTypePolicies } from "../generated/graphql";
import { useTokenStore } from "../store/auth";
import { createWithApollo } from "./createWithApollo";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const { accessToken, refreshToken } = useTokenStore.getState();

    return {
      headers: {
        ...headers,
        "access-token": accessToken,
        "refresh-token": refreshToken,
      },
    };
  });

  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const accessToken = headers.get("access-token");
    const refreshToken = headers.get("refresh-token");

    if (accessToken && refreshToken) {
      useTokenStore.getState().setTokens({ accessToken, refreshToken });
    }

    return response;
  });
});

const links = ApolloLink.from([authLink.concat(httpLink)]);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      findContests: {
        keyArgs: false,
        merge(
          existing: PaginatedContest | undefined,
          incoming: PaginatedContest
        ): PaginatedContest {
          return {
            ...incoming,
            contests: [...(existing?.contests || []), ...incoming.contests],
          };
        },
      },
    },
  },
};

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    headers: {
      cookie: (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) || "",
    },
    link: links,
    cache: new InMemoryCache({ typePolicies }),
  });

export const withApollo = createWithApollo(createClient);
