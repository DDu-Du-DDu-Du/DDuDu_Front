import { formatDateToYYYYMMDD } from "@/app/_utils";

import { MainFeed, MainHeader, MainSchedule } from "./components";
import { TIMETABLE_DDUDU_LIST } from "./feed.constants";

interface FeedPageProps {
  searchParams: { view: string; date: string };
}

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { view, date = formatDateToYYYYMMDD(new Date()) } = searchParams;

  return (
    <div className="py-[2.4rem] px-[2.4rem]">
      <MainHeader />
      {view === "ddudu" && <MainFeed selectedDDuDu={date} />}
      {view === "schedule" && <MainSchedule dailyTimeTable={TIMETABLE_DDUDU_LIST} />}
    </div>
  );
};

export default FeedPage;
