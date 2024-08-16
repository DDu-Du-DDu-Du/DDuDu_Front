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

        {timeline.map(({ beginAt, ddudus }) => (
          <TimeLineItem
            key={`${beginAt}`}
            baseTime={beginAt}
            dduduList={ddudus}
          />
        ))}
      </S.TimelineContainer>
    </S.TimelineLayout>
  );
};

export default Timeline;
