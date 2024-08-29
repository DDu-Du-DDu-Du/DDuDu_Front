// import { MonthlyGoalsType } from "@/app/_components/client/Calender/FeedCalender/FeedCalender";
import { getDailyList } from "@/app/_services/client";
import { formatDateToYYYYMMDD } from "@/app/_utils";
import { auth } from "@/auth";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { MainFeed, MainHeader, MainSchedule } from "./components";
import { TIMETABLE_DDUDU_LIST } from "./feed.constants";

interface FeedPageProps {
  searchParams: { view: string; date: string };
}

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { view, date = formatDateToYYYYMMDD(new Date()) } = searchParams;

  const session = await auth();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["dailyList", date],
    queryFn: () =>
      getDailyList({
        accessToken: session?.sessionToken as string,
        userId: session?.user.userId as number,
        date,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  // const dailyTimeTable: MainDailyTimeTableType[] = await getDailyTimeTable(
  //   session?.sessionToken as string,
  //   session?.user.userId as number,
  // );

  // const monthlyGoals: MonthlyGoalsType[] = await getMonthlyGoals({
  //   accessToken: session?.sessionToken as string,
  //   type: view === "ddudu" ? "MONTH" : "WEEK",
  // });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="py-[2.4rem] px-[2.4rem]">
        <MainHeader />
        {view === "ddudu" && (
          <MainFeed
            monthlyGoals={[
              { id: 0, contents: "테스트 1", type: "WEEK" },
              { id: 1, contents: "테스트 2", type: "WEEK" },
            ]}
            selectedDDuDu={date}
          />
        )}
        {view === "schedule" && <MainSchedule dailyTimeTable={TIMETABLE_DDUDU_LIST} />}
      </div>
    </HydrationBoundary>
  );
};

export default FeedPage;
