import { fetchApi } from "@/app/_api";
import AUTH from "@/app/_constants/endPoint/auth/auth";

export const socialLogin = async (socialToken: string) => {
  const response = await fetchApi(`${AUTH.SOCIAL_LOGIN}`, {
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
  const response = await fetchApi(`${AUTH.REFRESH_TOKEN}`, {
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
