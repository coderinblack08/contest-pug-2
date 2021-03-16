import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect } from "react";
import { LandingPage } from "../screens/LandingPage";
import { useTokenStore } from "../store/auth";

export const Provider: React.FC = ({ children }) => {
  const tokens = useTokenStore((s) => !!s.accessToken && !!s.refreshToken);
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

  if (!tokens) {
    return <LandingPage />;
  }

  return <>{children}</>;
};
