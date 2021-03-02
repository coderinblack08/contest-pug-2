import React, { useEffect } from "react";
import { useTokenStore } from "../../store/auth";
import { Login } from "../screens/Login";
import queryString from "query-string";
import { useRouter } from "next/router";

export const Wrapper: React.FC = ({ children }) => {
  const hasTokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
  const router = useRouter();

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken &&
      params.refreshToken
    ) {
      const { accessToken, refreshToken } = params;
      router.replace("/", undefined, { shallow: true });
      useTokenStore.getState().setTokens({
        accessToken,
        refreshToken,
      });
    }
  }, []);

  if (!hasTokens) {
    return <Login />;
  }

  return <div>{children}</div>;
};
