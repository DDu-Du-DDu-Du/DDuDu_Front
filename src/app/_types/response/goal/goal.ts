export interface GoalType {
  id: number;
  name: string;
  status: "IN_PROGRESS" | "DONE";
  color: string;
}

export interface GoalDetailType {
  id: number;
  name: string;
  status: "IN_PROGRESS" | "DONE";
  color: string;
  privacyType: GoalPrivacyType;
  repeatDdudus: RepeatDdudusType[];
}

export interface RepeatDdudusType {
  id: number;
  name: string;
  repeatPattern: RepeatDdudusPattern;
  startDate: string;
  endDate: string;
  beginAt?: string;
  endAt?: string;
}

export interface RepeatDdudusPattern {
  repeatType: RepeatDdudusDateType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDaysOfMonth?: DayOfMonth[];
  lastDay?: boolean;
}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type GoalPrivacyType = "PUBLIC" | "FOLLOWER" | "PRIVATE";
export type RepeatDdudusDateType = "DAILY" | "WEEKLY" | "MONTHLY";
