import { fetchApi } from "@/app/_api";

export const socialLogin = async (socialToken: string) => {
  // TODO: API 엔드포인트 상수로 관리, QueryClient Cache 에러 발생
  const response = await fetchApi(`/api/auth/login/KAKAO`, {
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
  const response = await fetchApi(`/api/auth/token`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
