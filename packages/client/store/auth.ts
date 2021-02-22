import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type TokenState = {
  accessToken: string;
  refreshToken: string;
  setTokens: (obj: { accessToken: string; refreshToken: string }) => void;
};

export const useTokenStore = create<TokenState>(
  devtools(
    persist(
      (set, _) => ({
        accessToken: "",
        refreshToken: "",
        setTokens: ({ accessToken, refreshToken }) =>
          set({ accessToken, refreshToken }),
      }),
      {
        name: "token-store",
      }
    ),
    "Token Store"
  )
);
