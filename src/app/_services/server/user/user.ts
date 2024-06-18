import { fetchApi } from "@/app/_api/";
import { USER } from "@/app/_constants";

export const getMe = async (accessToken: string) => {
  const response = await fetchApi(`${USER.ME}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
