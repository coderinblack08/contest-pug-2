import create from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

export const useTokenStore = create(
  devtools(
    persist(
      combine({ accessToken: "", refreshToken: "" }, (set) => ({
        setTokens: (tokens: { accessToken: string; refreshToken: string }) => set(tokens),
      })),
      { name: "token-store" }
    )
  )
);
