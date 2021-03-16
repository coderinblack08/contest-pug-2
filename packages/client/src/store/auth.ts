import create from "zustand";
import { combine, persist } from "zustand/middleware";

export const useTokenStore = create(
  persist(
    combine({ accessToken: "", refreshToken: "" }, (set) => ({
      setTokens: (tokens: { accessToken: string; refreshToken: string }) => set(tokens),
    })),
    { name: "token-store" }
  )
);
