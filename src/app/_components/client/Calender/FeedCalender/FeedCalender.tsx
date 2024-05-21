"use client";

import { FeedCalenderStyles } from "../Calender.styles";

import { CaptionProps, DayContentProps, DayPicker } from "react-day-picker";

import { FeedCalenderDayContent, FeedCalenderHeader } from "./components";

import { ko } from "date-fns/locale/ko";

interface FeedCalenderProps {
  monthlyGoals?: string[];
}

const FeedCalender = ({ monthlyGoals }: FeedCalenderProps) => {
  return (
    <DayPicker
      locale={ko}
      fixedWeeks
      mode={"single"}
      className="w-full"
      classNames={FeedCalenderStyles}
      components={{
        Caption: (props: CaptionProps) => FeedCalenderHeader(props, monthlyGoals),
        DayContent: (props: DayContentProps) => FeedCalenderDayContent(props),
      }}
    />
  );
};

export default FeedCalender;
