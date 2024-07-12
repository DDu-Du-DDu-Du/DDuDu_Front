import { fetchApi } from "@/app/_api/";
import { GOAL } from "@/app/_constants";

export const getGoalList = async (accessToken: string, userId: number) => {
  const response = await fetchApi(`${GOAL.LIST}?userId=${userId}`, {
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

export const getGoalPeriod = async (accessToken: string, type: "WEEK" | "MONTH" = "MONTH") => {
  const response = await fetchApi(`${GOAL.PERIOD}?type=${type}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};
