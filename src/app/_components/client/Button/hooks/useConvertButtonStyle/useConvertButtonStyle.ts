import {
  convertBackgroundColor,
  convertBorder,
  convertFontColor,
  convertFontSize,
  convertFontWeight,
  convertRadius,
} from "../../utils";
import { UseConvertButtonStyleProps } from "./useConvertButtonStyle.type";

import { twJoin } from "tailwind-merge";

const useConvertButtonStyle = ({
  radius,
  fontSize,
  fontWeight,
  fontColor,
  backgroundColor,
  border,
  shadow,
}: UseConvertButtonStyleProps) => {
  return twJoin(
    convertRadius(radius),
    convertFontSize(fontSize),
    convertFontWeight(fontWeight),
    convertFontColor(fontColor),
    convertBackgroundColor(backgroundColor),
    convertBorder(border),
    shadow && "shadow-md",
  );
};

export default useConvertButtonStyle;
