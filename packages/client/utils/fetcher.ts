import { QueryFunctionContext } from "react-query";
import { useTokenStore } from "../store/auth";

export const fetcher = async <T = any>(
  context: QueryFunctionContext<any>
): Promise<T> => {
  const { getState } = useTokenStore;
  const { accessToken, refreshToken, setTokens } = getState();

  const request = await fetch(`http://localhost:4000${context.queryKey}`, {
    headers: {
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  });

  if (request.status !== 200) {
    throw new Error(await request.text());
  }

  const newAccessToken = request.headers.get("access-token");
  const newRefreshToken = request.headers.get("refresh-token");

  console.log(newAccessToken, newRefreshToken);

  if (newAccessToken && newRefreshToken) {
    setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  }

  const data = await request.json();

  return data;
};
