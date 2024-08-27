import { fetchApi } from "@/app/_api/";
import { REPEAT_DDUDU } from "@/app/_constants";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";

interface FetchCreateRepeatDduduProps {
  accessToken: string;
  repeatDDuDuData: RepeatDduduRequestType & { goalId: string };
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

interface fetchEditRepeatDDuduProps {
  accessToken: string;
  repeatDDuDuData: RepeatDduduRequestType;
  repeatId: string;
}

export const fetchEditRepeatDDudu = async ({
  accessToken,
  repeatDDuDuData,
  repeatId,
}: fetchEditRepeatDDuduProps) => {
  const response = await fetchApi(`${REPEAT_DDUDU.CREATE}`, {
    method: "PUT",
    body: JSON.stringify(repeatDDuDuData),
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["repeat", "ddudu", repeatId],
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
