"use client";

import { FeedCalenderStyles } from "../Calender.styles";

import { CaptionLabelProps, DayContentProps, DayPicker } from "react-day-picker";

import ChevronLeftIcon from "@/app/_components/server/icons/ChevronLeftIcon/ChevronLeftIcon";
import ChevronRightIcon from "@/app/_components/server/icons/ChevronRightIcon/ChevronRightIcon";
import formatDateToYYYYMMDD from "@/app/_utils/formatDateToYYYYMMDD/formatDateToYYYYMMDD";

import DailyDDuDu from "./components/DailyDDuDu/DailyDDuDu";
import { DAILY_DDUDU_MOCK_DATA } from "./components/DailyDDuDu/DailyDDuDu.constant";

import { ko } from "date-fns/locale/ko";

const FeedCalender = () => {
  return (
    <DayPicker
      locale={ko}
      fixedWeeks
      mode={"single"}
      className="w-full"
      classNames={FeedCalenderStyles}
      components={{
        CaptionLabel: (date: CaptionLabelProps) => (
          <p>
            {date.displayMonth.getFullYear()} {date.displayMonth.getMonth() + 1}월
          </p>
        ),
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon
            {...props}
            className="h-5 w-5"
          />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon
            {...props}
            className="h-5 w-5"
          />
        ),
        DayContent: (props: DayContentProps) => {
          const formattedDate = formatDateToYYYYMMDD(props.date);
          const currentDate = props.date.getDate();

          return (
            <>
              {/* TODO: API 연결 후 데이터 교체 */}
              {DAILY_DDUDU_MOCK_DATA[formattedDate] && (
                <DailyDDuDu
                  totalCount={DAILY_DDUDU_MOCK_DATA[formattedDate].total}
                  doneCount={DAILY_DDUDU_MOCK_DATA[formattedDate].done}
                  restCount={DAILY_DDUDU_MOCK_DATA[formattedDate].rest}
                />
              )}

              <p className="text-example_gray_800">{currentDate}</p>
            </>
          );
        },
      }}
    />
  );
};

export default FeedCalender;
