import { TimeItem, TimeStamp } from "./components";

interface TimeItemType {
  todo: string;
  startAt: string;
  endAt: string;
}

interface TimelineItemProps {
  baseTime: string;
  TodoList: TimeItemType[];
}

const TimelineItem = ({ baseTime, TodoList }: TimelineItemProps) => {
  return (
    <li className="flex w-full">
      <TimeStamp>{baseTime}</TimeStamp>

      <div className="w-[5rem]" />

      <ul className="flex flex-1 flex-col gap-[1rem] pr-[1rem]">
        {TodoList.map(({ todo, startAt, endAt }, index) => (
          <TimeItem
            key={todo}
            name={todo}
            startTime={startAt}
            endTime={endAt}
            isLastItem={index === TodoList.length - 1}
            themeColor="#000"
          />
        ))}
      </ul>
    </li>
  );
};

export default TimelineItem;
