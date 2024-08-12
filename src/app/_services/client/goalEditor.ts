import { fetchApi } from "@/app/_api/";
import { GOAL_EDITOR } from "@/app/_constants";

export const getGoalEditorData = async (accessToken: string, goalId: string) => {
  const response = await fetchApi(`${GOAL_EDITOR.DATA}/${goalId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["goal", "editor", goalId],
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
