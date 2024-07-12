// import { MonthlyGoalsType } from "@/app/_components/client/Calender/FeedCalender/FeedCalender";
import { getDailyList } from "@/app/_services/client";
import { auth } from "@/auth";

import { MainFeed, MainHeader, MainSchedule } from "./components";
import { TIMETABLE_DDUDU_LIST } from "./feed.constants";
import { MainDailyListType } from "./feed.types";

interface FeedPageProps {
  searchParams: { view: string; date: string };
}

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { view, date } = searchParams;
  const session = await auth();

  const dailyList: MainDailyListType[] = await getDailyList(
    session?.sessionToken as string,
    session?.user.userId as number,
    date,
  );

  // console.log("dailyList", dailyList);

  // const dailyTimeTable: MainDailyTimeTableType[] = await getDailyTimeTable(
  //   session?.sessionToken as string,
  //   session?.user.userId as number,
  // );

  // const monthlyGoals: MonthlyGoalsType[] = await getMonthlyGoals({
  //   accessToken: session?.sessionToken as string,
  //   type: view === "ddudu" ? "MONTH" : "WEEK",
  // });

  return (
    <div className="py-[2.4rem] px-[2.4rem]">
      <MainHeader />
      {view === "ddudu" && (
        <MainFeed
          dailyList={dailyList}
          monthlyGoals={[
            { id: 0, contents: "테스트 1", type: "WEEK" },
            { id: 1, contents: "테스트 2", type: "WEEK" },
          ]}
          selectedDDuDu={date}
        />
      )}
      {view === "schedule" && <MainSchedule dailyTimeTable={TIMETABLE_DDUDU_LIST} />}
    </div>
  );
};

export default FeedPage;
