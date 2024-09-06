import { fetchApi } from "@/app/_api/";
import { REPEAT_DDUDU } from "@/app/_constants";
import { REPEAT_DDUDU_KEY } from "@/app/_constants/queryKey/queryKey";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";

interface FetchCreateRepeatDduduProps {
  accessToken: string;
  repeatDDuDuData: RepeatDduduRequestType & { goalId: number };
}

export const fetchCreateRepeatDDudu = async ({
  accessToken,
  repeatDDuDuData,
}: FetchCreateRepeatDduduProps) => {
  const response = await fetchApi(`${REPEAT_DDUDU.CREATE}`, {
    method: "POST",
    body: JSON.stringify(repeatDDuDuData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: [REPEAT_DDUDU_KEY.REPEAT_DDUDU],
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
  const response = await fetchApi(`${REPEAT_DDUDU.EDIT}/${repeatId}`, {
    method: "PUT",
    body: JSON.stringify(repeatDDuDuData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: [REPEAT_DDUDU_KEY.REPEAT_DDUDU, repeatId],
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
