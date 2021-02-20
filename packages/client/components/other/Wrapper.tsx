import React, { useEffect } from "react";
import { useTokenStore } from "../../store/auth";
import { Login } from "../screens/Login";
import queryString from "query-string";

export const Wrapper: React.FC = ({ children }) => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken &&
      params.refreshToken
    ) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      });
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  if (!hasTokens) {
    return (
      <main className="max-w-3xl mx-auto px-5 py-10 md:py-20 2xl:py-32">
        <Login />
      </main>
    );
  }

  return <div>{children}</div>; // TODO: Getting error "Expected server HTML to contain a matching <div> in <div>"
};
