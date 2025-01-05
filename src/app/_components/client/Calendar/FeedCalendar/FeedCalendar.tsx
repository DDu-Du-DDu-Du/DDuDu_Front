"use client";

import { feedCalendarStyles } from "../calendar.styles";

import { CaptionProps, DayContentProps, DayPicker } from "react-day-picker";

import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";

import { FeedCalendarDayContent, FeedCalendarHeader } from "./components";

import { ko } from "date-fns/locale/ko";
import { usePathname, useSearchParams } from "next/navigation";

export interface GoalsType {
  id: number;
  contents: string;
  type: "WEEK" | "MONTH";
}

export interface FeedCalendarProps {
  monthlyGoals?: GoalsType;
  monthlyDDuDus: MonthlyWeeklyDDuDuType[];
  selectedDDuDuDate?: string;
}

const FeedCalendar = ({ monthlyGoals, monthlyDDuDus, selectedDDuDuDate }: FeedCalendarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let queryString = searchParams.toString();
  const deleteParamIndex = searchParams.toString().indexOf("&date=");

  if (deleteParamIndex > -1) {
    queryString = searchParams.toString().slice(0, deleteParamIndex);
  }

  const currentURL = `${pathname}?${queryString}`;

  return (
    <DayPicker
      locale={ko}
      fixedWeeks
      mode={"single"}
      ISOWeek
      className="w-full"
      classNames={feedCalendarStyles}
      components={{
        Caption: (props: CaptionProps) => FeedCalendarHeader({ props, monthlyGoals }),
        DayContent: (props: DayContentProps) =>
          FeedCalendarDayContent({ props, monthlyDDuDus, currentURL, selectedDDuDuDate }),
      }}
    />
  );
};

export default FeedCalendar;
