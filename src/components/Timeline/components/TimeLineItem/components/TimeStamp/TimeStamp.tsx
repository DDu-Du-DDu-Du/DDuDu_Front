import * as S from "./TimeStamp.styles";

interface TimeStampProps {
  children: React.ReactNode;
}

const TimeStamp = ({ children }: TimeStampProps) => {
  return (
    <S.TimeStampContainer>
      <S.TimeStampContent>{children}</S.TimeStampContent>
    </S.TimeStampContainer>
  );
};

export default TimeStamp;
