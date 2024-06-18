import { fetchApi } from "@/app/_api";
import Auth from "@/app/_constants/endPoint/auth/auth";

export const socialLogin = async (socialToken: string) => {
  // TODO: API 엔드포인트 상수로 관리, QueryClient Cache 에러 발생
  const response = await fetchApi(`${Auth.SOCIAL_LOGIN}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${socialToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const refreshAccessToken = async (refreshToken: string) => {
  // TODO: API 엔드포인트 상수로 관리, QueryClient Cache 에러 발생
  const response = await fetchApi(`${Auth.REFRESH_TOKEN}`, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
