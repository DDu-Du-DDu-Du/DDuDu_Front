import { fetchApi } from "@/app/_api/";
import { GOAL } from "@/app/_constants";

export const getGoalList = async (accessToken: string, userId: string) => {
  const response = await fetchApi(`${GOAL.LIST}?userId=${userId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["goal", userId],
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
