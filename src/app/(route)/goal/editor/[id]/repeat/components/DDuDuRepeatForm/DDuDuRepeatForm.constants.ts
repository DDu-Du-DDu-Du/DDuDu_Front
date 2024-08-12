import { DayOfWeek } from "@/app/_types/response/goal/goal";

import { DayOfMonthString } from "./DDuDuRepeatForm.types";

export const DATE_RADIO_LIST = [
  { id: "DAILY", name: "repeatType", label: "매일" },
  { id: "WEEKLY", name: "repeatType", label: "매주" },
  { id: "MONTHLY", name: "repeatType", label: "매월" },
];

export const DAY_OF_WEEK_STRING = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

export const DAY_OF_WEEK: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
export const DAY_OF_MONTH: DayOfMonthString[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];
