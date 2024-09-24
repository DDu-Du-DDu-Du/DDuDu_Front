import { formatDateToYYYYMMDD } from "@/app/_utils";

import { MainFeed, MainHeader, MainSchedule } from "./components";

interface FeedPageProps {
  searchParams: { view: string; date: string };
}

const FeedPage = async ({ searchParams }: FeedPageProps) => {
  const { view, date = formatDateToYYYYMMDD(new Date()) } = searchParams;

  return (
    <div>
      <MainHeader />
      {view === "ddudu" && <MainFeed selectedDDuDuDate={date} />}
      {view === "schedule" && <MainSchedule selectedDDuDuDate={date} />}
    </div>
  );
};

export default FeedPage;
