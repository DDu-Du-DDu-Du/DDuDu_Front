import * as S from "./Timeline.styles";

import { TimelineResponse } from "@/lib/types";

import { LineBox, TimeLineItem } from "./components";

interface TimelineProps {
  timeline: TimelineResponse[];
}

const Timeline = ({ timeline }: TimelineProps) => {
  return (
    <S.TimelineLayout>
      <S.TimelineContainer>
        <LineBox />

        {timeline.map(({ time, ddudus }) => (
          <TimeLineItem
            key={`${time}`}
            baseTime={time}
            dduduList={ddudus}
          />
        ))}
      </S.TimelineContainer>
    </S.TimelineLayout>
  );
};

export default Timeline;
