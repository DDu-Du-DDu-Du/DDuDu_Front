import * as S from "./SwitchButton.styles";

const SwitchButton = () => {
  return (
    <S.SwitchButtonLayout>
      <S.SwitchButtonLabel
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        // onClick={handleToggleToFirst}
      >
        {/* {firstLabel} */}
      </S.SwitchButtonLabel>

      <S.SwitchButtonLabel
        className="relative flex justify-center items-center w-[50%] box-border z-10"
        // onClick={handleToggleToSecond}
      >
        {/* {secondLabel} */}
      </S.SwitchButtonLabel>
      <S.SwitchButtonMove $isToggle={false} />
    </S.SwitchButtonLayout>
  );
};

export default SwitchButton;
