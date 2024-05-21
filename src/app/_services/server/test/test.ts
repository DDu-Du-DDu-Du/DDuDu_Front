import { fetchApi } from "@/app/_api/";

export const postTest = async () => {
  const response = await fetchApi(`/actuator/health`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
