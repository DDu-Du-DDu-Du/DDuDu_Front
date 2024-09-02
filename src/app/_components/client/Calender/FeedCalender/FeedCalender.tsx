"use client";

import { FeedCalenderStyles } from "../Calender.styles";

import { CaptionProps, DayContentProps, DayPicker } from "react-day-picker";

import { MonthlyDDuDuType } from "@/app/_types/response/feed/feed";

import { FeedCalenderDayContent, FeedCalenderHeader } from "./components";

import { ko } from "date-fns/locale/ko";
import { usePathname, useSearchParams } from "next/navigation";

export interface MonthlyGoalsType {
  id: number;
  contents: string;
  type: "WEEK" | "MONTH";
}

export interface FeedCalenderProps {
  monthlyGoals?: MonthlyGoalsType;
  monthlyDDuDus: MonthlyDDuDuType[];
  selectedDDuDu?: string;
}

const FeedCalender = ({ monthlyGoals, monthlyDDuDus, selectedDDuDu }: FeedCalenderProps) => {
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
      className="w-full"
      classNames={FeedCalenderStyles}
      components={{
        Caption: (props: CaptionProps) => FeedCalenderHeader({ props, monthlyGoals }),
        DayContent: (props: DayContentProps) =>
          FeedCalenderDayContent({ props, monthlyDDuDus, currentURL, selectedDDuDu }),
      }}
    />
  );
};

export default FeedCalender;
