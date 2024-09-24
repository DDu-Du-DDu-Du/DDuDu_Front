"use client";

import { Fragment, useMemo } from "react";

import { FeedCalendar } from "@/app/_components/client/Calendar";
import { GoalsType } from "@/app/_components/client/Calendar/FeedCalendar/FeedCalendar";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { getDailyList, getGoals, getMonthlyDDuDus } from "@/app/_services/client";
import { MainDailyListType, MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { useQuery } from "@tanstack/react-query";

import { MainGoalItem } from "..";

import { useSession } from "next-auth/react";

interface MainFeedProps {
  selectedDDuDuDate: string;
}

const MainFeed = ({ selectedDDuDuDate }: MainFeedProps) => {
  const convertSelectedDateYYYYMM = useMemo(() => {
    return selectedDDuDuDate.slice(0, 7);
  }, [selectedDDuDuDate]);

  const { data: session } = useSession();

  const { data: dailyList } = useQuery<MainDailyListType[]>({
    queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate],
    queryFn: () =>
      getDailyList({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date: selectedDDuDuDate,
      }),
  });

  const { data: monthlyDDuDus } = useQuery<MonthlyWeeklyDDuDuType[]>({
    queryKey: [FEED_KEY.MONTHLY_DDUDUS],
    queryFn: () =>
      getMonthlyDDuDus({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date: convertSelectedDateYYYYMM,
      }),
  });

  const { data: monthlyGoals } = useQuery<GoalsType>({
    queryKey: [FEED_KEY.MONTHLY_GOALS],
    queryFn: () =>
      getGoals({
        accessToken: session?.sessionToken as string,
        type: "MONTH",
        date: selectedDDuDuDate,
      }),
  });

  return (
    <div className="px-[2.4rem]">
      <FeedCalendar
        monthlyDDuDus={monthlyDDuDus || []}
        monthlyGoals={monthlyGoals}
        selectedDDuDuDate={selectedDDuDuDate}
      />
      <ul className="mt-[2rem]">
        {dailyList?.map(({ goal, ddudus }, index) => (
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

export default MainFeed;
