import * as S from "./TimeLineItem.styles";

import { TimelineItemResponse } from "@/lib/types";

import { TimeItem, TimeStamp } from "./components";

interface TimelineItemProps {
  baseTime: string;
  dduduList: TimelineItemResponse[];
}

const TimelineItem = ({ baseTime, dduduList }: TimelineItemProps) => {
  return (
    <S.TimeLineItemLayout>
      <TimeStamp>{baseTime}</TimeStamp>

      <S.TimeLineItemInner />

      <S.TimeLineItemContainer>
        {dduduList.map((ddudu, index) => (
          <TimeItem
            key={ddudu.id}
            ddudu={ddudu}
            isLastItem={dduduList.length - 1 === index}
          />
        ))}
      </S.TimeLineItemContainer>
    </S.TimeLineItemLayout>
  );
};

export default TimelineItem;
