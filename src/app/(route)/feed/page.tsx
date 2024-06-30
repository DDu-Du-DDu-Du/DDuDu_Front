import { MainFeed, MainHeader, MainSchedule } from "./components";

interface FeedPageProps {
  searchParams: { view: string };
}

const FeedPage = ({ searchParams }: FeedPageProps) => {
  const { view } = searchParams;

  return (
    <div className="py-[2.4rem] px-[2.4rem]">
      <MainHeader />
      {view === "ddudu" && <MainFeed />}
      {view === "schedule" && <MainSchedule />}
    </div>
  );
};

export default FeedPage;
