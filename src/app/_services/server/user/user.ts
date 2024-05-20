import { fetchApi } from "@/app/_api/index";

export const getMe = async (id: string) => {
  const response = await fetchApi(`/api/goals/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
