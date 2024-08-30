import { fetchApi } from "@/app/_api";
import { FEED } from "@/app/_constants";

interface GetDailyListProps {
  accessToken: string;
  userId: number;
  date: string;
}

export const getDailyList = async ({ accessToken, userId, date }: GetDailyListProps) => {
  const selectedDate = `&date=${date}`;

  const response = await fetchApi(`${FEED.DAILY_LIST}?userId=${userId}${selectedDate}`, {
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

interface GetDailyTimeTableProps {
  accessToken: string;
  userId: string;
}

export const getDailyTimeTable = async ({ accessToken, userId }: GetDailyTimeTableProps) => {
  const response = await fetchApi(`${FEED.DAILY_TIMETABLE}?userId=${userId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

interface GetMonthlyGoalsProps {
  accessToken: string;
  type: "WEEK" | "MONTH";
}

export const getMonthlyGoals = async ({ accessToken, type }: GetMonthlyGoalsProps) => {
  const response = await fetchApi(`${FEED.MONTHLY_GOALS}?type=${type}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getMonthlyDDuDus = async ({ accessToken, userId, date }: GetDailyListProps) => {
  const selectedDate = `&date=${date}`;

  const response = await fetchApi(`${FEED.MONTHLY_DDUDUS}?userId=${userId}${selectedDate}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getDDuDuDetail = async ({ accessToken, id }: FetchUpdateDDuDuProps) => {
  const response = await fetchApi(`${FEED.DDUDU_DETAIL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

interface FetchCreateDDuDuProps {
  accessToken: string;
  requestDDuDu: {
    goalId: number;
    name: string;
    scheduledOn: string;
  };
}

export const fetchCreateDDuDu = async ({ accessToken, requestDDuDu }: FetchCreateDDuDuProps) => {
  const response = await fetchApi(`${FEED.CREATE_DDUDU}`, {
    method: "POST",
    body: JSON.stringify(requestDDuDu),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

interface FetchEditDDuDuProps {
  accessToken: string;
  id: number;
  name: string;
}

export const fetchEditDDuDu = async ({ accessToken, id, name }: FetchEditDDuDuProps) => {
  const response = await fetchApi(`${FEED.EDIT_DDUDU}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.json();
};

interface FetchUpdateDDuDuProps {
  accessToken: string;
  id: number;
}

export const fetchDeleteDDuDu = async ({ accessToken, id }: FetchUpdateDDuDuProps) => {
  const response = await fetchApi(`${FEED.DELETE_DDUDU}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return response.status;
  }

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }
};

export const fetchCompleteToggleDDuDu = async ({ accessToken, id }: FetchUpdateDDuDuProps) => {
  const response = await fetchApi(`${FEED.COMPLETE_TOGGLE_DDUDU}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }
};
