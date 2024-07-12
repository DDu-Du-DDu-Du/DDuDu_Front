import { Fragment } from "react";

import { FeedCalender } from "@/app/_components/client/Calender";
import { MonthlyGoalsType } from "@/app/_components/client/Calender/FeedCalender/FeedCalender";

import { MainGoalItem } from "..";
import { MainDailyListType } from "../../feed.types";

interface MainFeedProps {
  dailyList: MainDailyListType[];
  monthlyGoals: MonthlyGoalsType[];
  selectedDDuDu?: string;
}

const MainFeed = ({ dailyList, monthlyGoals, selectedDDuDu }: MainFeedProps) => {
  return (
    <>
      <FeedCalender
        monthlyDDuDus={{
          "2024-06-01": { total: 120, done: 4, rest: 116 },
          "2024-06-03": { total: 20, done: 7, rest: 13 },
          "2024-06-04": { total: 20, done: 10, rest: 10 },
          "2024-06-09": { total: 20, done: 12, rest: 8 },
          "2024-06-12": { total: 20, done: 14, rest: 6 },
          "2024-06-21": { total: 20, done: 15, rest: 5 },
          "2024-06-25": { total: 20, done: 20, rest: 0 },
        }}
        monthlyGoals={monthlyGoals}
        selectedDDuDu={selectedDDuDu}
      />
      <ul className="mt-[2rem]">
        {dailyList?.map(({ goal, ddudus }, index) => (
          <Fragment key={index}>
            <MainGoalItem
              goal={goal}
              ddudus={ddudus}
            />
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default MainFeed;
