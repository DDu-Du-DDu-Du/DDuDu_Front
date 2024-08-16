import * as S from "./SwitchButton.styles";

interface SwitchButtonProps {
  firstLabel?: string;
  secondLabel?: string;
  // viewKey?: string;
  // selectedOption?: string;
  // alternativeOption?: string;
}

const SwitchButton = ({
  firstLabel = "투두",
  secondLabel = "스케줄",
  // viewKey = "view",
  // selectedOption = "ddudu",
  // alternativeOption = "schedule",
}: SwitchButtonProps) => {
  return (
    <S.SwitchButtonLayout>
      <S.SwitchButtonLabel
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        // onClick={handleToggleToFirst}
      >
        {firstLabel}
      </S.SwitchButtonLabel>

      <S.SwitchButtonLabel
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        // onClick={handleToggleToSecond}
      >
        {secondLabel}
      </S.SwitchButtonLabel>
      <S.SwitchButtonMove $isToggle={false} />
    </S.SwitchButtonLayout>
  );
};

export default SwitchButton;
