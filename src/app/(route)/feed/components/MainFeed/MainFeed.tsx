"use client";

import { Fragment, useMemo } from "react";

import { FeedCalender } from "@/app/_components/client/Calender";
import { MonthlyGoalsType } from "@/app/_components/client/Calender/FeedCalender/FeedCalender";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { getDailyList, getMonthlyDDuDus, getMonthlyGoals } from "@/app/_services/client";
import { MainDailyListType, MonthlyDDuDuType } from "@/app/_types/response/feed/feed";
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

  const { data: monthlyDDuDus } = useQuery<MonthlyDDuDuType[]>({
    queryKey: [FEED_KEY.MONTHLY_DDUDUS],
    queryFn: () =>
      getMonthlyDDuDus({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date: convertSelectedDateYYYYMM,
      }),
  });

  const { data: monthlyGoals } = useQuery<MonthlyGoalsType>({
    queryKey: [FEED_KEY.MONTHLY_GOALS],
    queryFn: () =>
      getMonthlyGoals({
        accessToken: session?.sessionToken as string,
        type: "MONTH",
        date: selectedDDuDuDate,
      }),
  });

  return (
    <>
      <FeedCalender
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
    </>
  );
};

export default MainFeed;
