import { fetchApi } from "@/app/_api/";
import { REPEAT_DDUDU } from "@/app/_constants";

interface FetchCreateRepeatDduduProps {
  accessToken: string;
  repeatDDuDuData: unknown;
}

export const fetchCreateRepeatDDudu = async ({
  accessToken,
  repeatDDuDuData,
}: FetchCreateRepeatDduduProps) => {
  const response = await fetchApi(`${REPEAT_DDUDU.CREATE}`, {
    method: "POST",
    body: JSON.stringify(repeatDDuDuData),
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["repeat", "ddudu"],
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
