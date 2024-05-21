"use client";

import { FeedCalenderStyles } from "../Calender.styles";

import { CaptionProps, DayContentProps, DayPicker } from "react-day-picker";

import { FeedCalenderDayContent, FeedCalenderHeader } from "./components";
import { DAILY_DDUDU_MOCK_DATA_TYPE } from "./components/DailyDDuDu/DailyDDuDu.constant";

import { ko } from "date-fns/locale/ko";

export interface FeedCalenderProps {
  monthlyGoals?: string[];
  monthlyDDuDus: DAILY_DDUDU_MOCK_DATA_TYPE;
}

const FeedCalender = ({ monthlyGoals, monthlyDDuDus }: FeedCalenderProps) => {
  return (
    <DayPicker
      locale={ko}
      fixedWeeks
      mode={"single"}
      className="w-full"
      classNames={FeedCalenderStyles}
      components={{
        Caption: (props: CaptionProps) => FeedCalenderHeader(props, monthlyGoals),
        DayContent: (props: DayContentProps) => FeedCalenderDayContent(props, monthlyDDuDus),
      }}
    />
  );
};

export default FeedCalender;
