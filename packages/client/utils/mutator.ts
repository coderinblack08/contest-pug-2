import { useTokenStore } from "../store/auth";

export const mutator = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT" | "DELETE"
]) => {
  const { getState } = useTokenStore;
  const { accessToken, refreshToken, setTokens } = getState();

  const request = await fetch(`http://localhost:4000${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  });

  if (request.status !== 200) {
    throw new Error(await request.text());
  }

  const newAccessToken = request.headers.get("access-token");
  const newRefreshToken = request.headers.get("refresh-token");

  if (newAccessToken && newRefreshToken) {
    setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  }

  const data = await request.json();

  return data;
};
