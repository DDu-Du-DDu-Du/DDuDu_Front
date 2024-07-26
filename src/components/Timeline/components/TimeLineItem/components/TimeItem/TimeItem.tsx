import * as S from "./TimeItem.styles";

import { TimelineItemResponse } from "@/lib/types";

interface TimeItemProps {
  ddudu: TimelineItemResponse;
  isLastItem: boolean;
}

const TimeItem = ({ ddudu, isLastItem }: TimeItemProps) => {
  const { /* id */ name, status, beginAt, endAt /* goalId */ } = ddudu;

  return (
    <S.TimeItemLayout>
      <S.TimeItemContainer>
        {/* middle icon */}
        <S.TimeItemIconLayout>
          <S.TimeItemIconOutline $status={status}>
            <S.TimeItemIconInner>
              {/*              
                TODO

                추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기 
              */}
              {status === "COMPLETED" && <S.TimeItemIconComplete />}
            </S.TimeItemIconInner>
          </S.TimeItemIconOutline>
        </S.TimeItemIconLayout>

        {/* middle timeline */}
        {!isLastItem && (
          <S.TimeLineDivider
            $status={status}
            /*
              TODO

              추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기
            */
          />
        )}
      </S.TimeItemContainer>

      {/* DDuDu Button */}
      <S.TimeItemButton
        whileTap={{ scale: 0.95 }}
        // style={{
        //   backgroundColor: hexConvertForRGBA({
        //     /*
        //       TODO

        //       추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기
        //     */
        //     hex: theme.colors["example_gray_900"],
        //     alpha: 0.1,
        //   }),
        // }}
        type="button"
        onClick={() => {
          /* 
            TODO

            추후 해당 DDuDu의 완료처리 로직
          */
        }}
      >
        <S.TimeItemButtonContent>{name}</S.TimeItemButtonContent>
        <S.TimeItemButtonTime>{`${beginAt} - ${endAt}`}</S.TimeItemButtonTime>
      </S.TimeItemButton>
    </S.TimeItemLayout>
  );
};

export default TimeItem;
