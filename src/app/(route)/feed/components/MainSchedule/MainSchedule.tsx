"use client";

import { Fragment } from "react";

import { Timeline } from "@/app/_components/client";
import { GoalsType } from "@/app/_components/client/Calender/FeedCalender/FeedCalender";
import WeekCalendar from "@/app/_components/client/Calender/WeekCalendar/WeekCalendar";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { getDailyTimeTable, getGoals, getWeeklyDDuDus } from "@/app/_services/client";
import { MainDailyTimeTableType, MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { useQuery } from "@tanstack/react-query";

import MainGoalItem from "../MainGoalItem/MainGoalItem";

import { useSession } from "next-auth/react";

interface MainScheduleProps {
  selectedDDuDuDate: string;
}

const MainSchedule = ({ selectedDDuDuDate }: MainScheduleProps) => {
  // 임시 DAILY TIME TABLE

  const { data: session } = useSession();

  const { data: weeklyDDuDus } = useQuery<MonthlyWeeklyDDuDuType[]>({
    queryKey: [FEED_KEY.WEEKLY_DDUDUS, selectedDDuDuDate],
    queryFn: () =>
      getWeeklyDDuDus({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date: selectedDDuDuDate,
      }),
  });

  const { data: dailyTimeTable } = useQuery<MainDailyTimeTableType>({
    queryKey: [FEED_KEY.DAILY_TIMETABLE, selectedDDuDuDate],
    queryFn: () =>
      getDailyTimeTable({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date: selectedDDuDuDate,
      }),
  });

  const { data: weeklyGoals } = useQuery<GoalsType>({
    queryKey: [FEED_KEY.WEEKLY_GOALS, selectedDDuDuDate],
    queryFn: () =>
      getGoals({
        accessToken: session?.sessionToken as string,
        type: "WEEK",
        date: selectedDDuDuDate,
      }),
  });

  return (
    <div className="bg-example_gray_100">
      <WeekCalendar
        weeklyDDuDus={weeklyDDuDus || []}
        weeklyGoals={weeklyGoals}
        selectedDDuDuDate={selectedDDuDuDate}
      />
      <Timeline
        timeline={dailyTimeTable?.timetable || []}
        selectedDDuDuDate={selectedDDuDuDate}
      />
      <ul className="bg-white_100 py-[2.2rem] px-[2.4rem]">
        {dailyTimeTable?.unassignedDdudus.map(({ goal, ddudus }, index) => (
          <Fragment key={index}>
            <MainGoalItem
              goal={goal}
              ddudus={ddudus}
              selectedDDuDuDate={selectedDDuDuDate}
            />
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default MainSchedule;
