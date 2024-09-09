import { DDuDuTimeType } from "@/app/(route)/feed/feed.types";
import { fetchApi } from "@/app/_api";
import { FEED } from "@/app/_constants";
import {
  RequestDDuDu,
  RequestDDuDuChangeDate,
  RequestPeriodGoals,
} from "@/app/_types/request/feed/feed";

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

interface PeriodGoalsProps {
  accessToken: string;
  type: "WEEK" | "MONTH";
  date: string;
}

export const getMonthlyGoals = async ({ accessToken, type, date }: PeriodGoalsProps) => {
  const selectedDate = `&date=${date}`;

  const response = await fetchApi(`${FEED.PERIOD_GOALS}?type=${type}${selectedDate}`, {
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

interface FetchCreateMonthlyGoalsProps {
  accessToken: string;
  periodGoals: RequestPeriodGoals;
}

export const fetchCreateMonthlyGoals = async ({
  accessToken,
  periodGoals,
}: FetchCreateMonthlyGoalsProps) => {
  const response = await fetchApi(`${FEED.PERIOD_GOALS}`, {
    method: "POST",
    body: JSON.stringify(periodGoals),
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

interface FetchEditMonthlyGoalsProps {
  accessToken: string;
  contents: string;
  periodGoalsId: number;
}

export const fetchEditMonthlyGoals = async ({
  accessToken,
  contents,
  periodGoalsId,
}: FetchEditMonthlyGoalsProps) => {
  const response = await fetchApi(`${FEED.PERIOD_GOALS}/${periodGoalsId}`, {
    method: "PUT",
    body: JSON.stringify({ contents }),
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
  const response = await fetchApi(`${FEED.DDUDU}/${id}`, {
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
  requestDDuDu: RequestDDuDu;
}

export const fetchCreateDDuDu = async ({ accessToken, requestDDuDu }: FetchCreateDDuDuProps) => {
  const response = await fetchApi(`${FEED.DDUDU}`, {
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
  const response = await fetchApi(`${FEED.DDUDU}/${id}`, {
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
  const response = await fetchApi(`${FEED.DDUDU}/${id}`, {
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
  const response = await fetchApi(`${FEED.DDUDU}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 204) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }
};

interface fetchDDuDuDateProps {
  accessToken: string;
  id: number;
  date: string;
}

export const fetchDDuDuChangeDate = async ({ accessToken, id, date }: fetchDDuDuDateProps) => {
  const changedDate: RequestDDuDuChangeDate = { newDate: date };

  const response = await fetchApi(`${FEED.DDUDU}/${id}/date`, {
    method: "PUT",
    body: JSON.stringify(changedDate),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 204) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.status;
};

export const fetchDDuDuRepeatDate = async ({ accessToken, id, date }: fetchDDuDuDateProps) => {
  const response = await fetchApi(`${FEED.DDUDU}/${id}/repeat`, {
    method: "POST",
    body: JSON.stringify({ repeatOn: date }),
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

interface FetchDDuDUChangeTimeProps {
  accessToken: string;
  time: DDuDuTimeType;
  id: number;
}

export const fetchDDuDuChangeTime = async ({
  accessToken,
  time,
  id,
}: FetchDDuDUChangeTimeProps) => {
  const response = await fetchApi(`${FEED.DDUDU}/${id}/period`, {
    method: "PUT",
    body: JSON.stringify(time),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 204) {
    throw new Error(`HHTP error! status: ${response.status}`);
  }

  return response.status;
};
