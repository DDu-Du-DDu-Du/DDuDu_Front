type MainGoalType = {
  id: number;
  name: string;
  color: string;
  status: "IN_PROGRESS" | "DONE";
};

export type MainDDuDusType = {
  id: number;
  name: string;
  status: "COMPLETE" | "UNCOMPLETED";
};

export interface MainDailyListType {
  goal: MainGoalType;
  ddudus: MainDDuDusType[];
}

export interface MonthlyWeeklyDDuDuType {
  date: string;
  totalCount: number;
  uncompletedCount: number;
}

export interface MainDailyTimeTableType {
  timetable: MainTimeTableType[];
  unassignedDdudus: MainDailyListType[];
}

export type MainTimeTableType = {
  beginAt: string;
  ddudus: MainTimeTableDDuDuType[];
};

export interface MainTimeTableDDuDuType {
  id: number;
  name: string;
  status: "COMPLETE" | "UNCOMPLETED";
  goalId: number;
  beginAt?: string;
  endAt?: string;
  color: string;
}
