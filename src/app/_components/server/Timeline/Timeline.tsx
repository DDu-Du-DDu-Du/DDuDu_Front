import { TimelineItemType } from "@/app/_types/response";

import { LineBox } from "./components";
import TimelineItem from "./components/TimelineItem/TimelineItem";

interface TimelineProps {
  timeline: TimelineItemType[];
}

const Timeline = ({ timeline }: TimelineProps) => {
  return (
    <article className="w-full py-[1rem]">
      <ul className="relative flex w-full min-w-[20rem] flex-col gap-[4rem]">
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
    </article>
  );
};

export default Timeline;
