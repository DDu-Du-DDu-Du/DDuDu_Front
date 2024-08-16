import * as S from "./SheetButton.styles";

import { HTMLMotionProps } from "framer-motion";

interface SheetButtonProps extends HTMLMotionProps<"button"> {
  buttonType?: "main" | "sub";
  title: string;
  Icon: React.ReactNode;

  rightPlace?: React.ReactNode;
  disabled?: boolean;
}

const SheetButton = ({
  buttonType = "main",
  title,
  Icon,
  rightPlace,
  disabled = false,

  ...rest
}: SheetButtonProps) => {
  return (
    <S.SheetButtonLayout
      type="button"
      $buttonType={buttonType}
      whileTap={disabled ? {} : { scale: 0.95 }}
      whileHover={disabled ? {} : { filter: "brightness(97%)" }}
      style={{ opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
      {...rest}
    >
      {Icon}

      <S.SheetButtonTitle $buttonType={buttonType}>{title}</S.SheetButtonTitle>

      {buttonType === "sub" && rightPlace && rightPlace}
    </S.SheetButtonLayout>
  );
};

export default SheetButton;
