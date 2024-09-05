type MainGoalType = {
  id: number;
  name: string;
  color: string;
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

export interface MonthlyDDuDuType {
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

interface MainTimeTableDDuDuType {
  id: number;
  name: string;
  status: "COMPLETE" | "UNCOMPLETED";
  goalId: number;
  beginAt?: string;
  endAt?: string;
}
