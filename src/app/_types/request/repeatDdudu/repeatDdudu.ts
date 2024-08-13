import { RepeatDdudusDateType } from "../../response/goal/goal";

export interface RepeatDduduRequestType {
  name: string;
  goalId: number;
  repeatType: RepeatDdudusDateType;
  repeatDaysOfWeek?: [];
  repeatDaysOfMonth?: [];
  lastDayOfMonth?: boolean;
  startDate: string;
  endDate: string;
  beginAt?: string;
  endAt?: string;
}
