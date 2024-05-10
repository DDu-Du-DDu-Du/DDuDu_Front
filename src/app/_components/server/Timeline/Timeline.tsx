import { TimelineItemType } from "@/app/_types/response";

import { LineBox } from "./components";
import TimelineItem from "./components/TimelineItem/TimelineItem";

interface TimelineProps {
  timeline: TimelineItemType[];
}

const Timeline = ({ timeline }: TimelineProps) => {
  return (
    <ul className="relative flex w-full flex-col gap-[4rem]">
      <LineBox />

      {timeline &&
        timeline.map(({ time, ddudus }, index) => (
          <TimelineItem
            key={`${time}${index}`}
            baseTime={time}
            dduduList={ddudus}
          />
        ))}
    </ul>
  );
};

export default Timeline;
