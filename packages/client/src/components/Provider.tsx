import React, { useEffect } from "react";
import { useTokenStore } from "../store/auth";
import queryString from "query-string";
import { useRouter } from "next/router";
import { LandingPage } from "../screens/LandingPage";

export const Provider: React.FC = ({ children }) => {
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
  }, [router]);

  if (!hasTokens) {
    return <LandingPage />;
  }

  return <>{children}</>;
};
