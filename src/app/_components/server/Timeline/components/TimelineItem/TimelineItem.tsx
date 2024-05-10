import { TimelineDDuDuItemType } from "@/app/_types/response";

import { TimeItem, TimeStamp } from "./components";

interface TimelineItemProps {
  baseTime: string;
  dduduList: TimelineDDuDuItemType[];
}

const TimelineItem = ({ baseTime, dduduList }: TimelineItemProps) => {
  return (
    <li className="flex w-full">
      <TimeStamp>{baseTime}</TimeStamp>

      <div className="w-[5rem]" />

      <ul className="flex flex-1 flex-col gap-[1rem] pr-[1rem]">
        {dduduList.map((ddudu, index) => (
          <TimeItem
            key={`${ddudu.id}${index}`}
            ddudu={ddudu}
            isLastItem={dduduList.length - 1 === index}
          />
        ))}
      </ul>
    </li>
  );
};

export default TimelineItem;
