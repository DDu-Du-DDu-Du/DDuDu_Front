import { DayOfMonth, DayOfWeek, RepeatDdudusDateType } from "../../response/goal/goal";

export interface RepeatDduduRequestType {
  name: string;
  repeatType: RepeatDdudusDateType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDaysOfMonth?: DayOfMonth[];
  lastDayOfMonth?: boolean;
  startDate: string;
  endDate: string;
  beginAt?: string;
  endAt?: string;
}
