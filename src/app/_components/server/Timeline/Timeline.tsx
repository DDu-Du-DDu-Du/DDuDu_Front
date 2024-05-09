import { LineBox } from "./components";
import TimelineItem from "./components/TimelineItem/TimelineItem";

const Timeline = () => {
  return (
    <ul className="relative flex w-full flex-col gap-[2rem]">
      <LineBox />

      <TimelineItem
        baseTime="3:00"
        TodoList={[
          { todo: "투두 테스트 1", startAt: "3:00", endAt: "5:00" },
          { todo: "투두 테스트 2", startAt: "3:00", endAt: "8:00" },
          { todo: "투두 테스트 3", startAt: "3:00", endAt: "10:00" },
          { todo: "투두 테스트 4", startAt: "3:00", endAt: "1:00" },
        ]}
      />

      <TimelineItem
        baseTime="3:00"
        TodoList={[
          { todo: "투두 테스트 1", startAt: "3:00", endAt: "5:00" },
          { todo: "투두 테스트 2", startAt: "3:00", endAt: "8:00" },
          { todo: "투두 테스트 3", startAt: "3:00", endAt: "10:00" },
          { todo: "투두 테스트 4", startAt: "3:00", endAt: "1:00" },
        ]}
      />
    </ul>
  );
};

export default Timeline;
