import { convertFontColor, convertFontSize, convertFontWeight, convertRadius } from "../../utils";
import { UseConvertButtonStyleProps } from "./useConvertButtonStyle.type";

import { twJoin } from "tailwind-merge";

const useConvertButtonStyle = ({
  radius,
  fontSize,
  fontWeight,
  fontColor,
}: UseConvertButtonStyleProps) => {
  return twJoin(
    convertRadius(radius),
    convertFontSize(fontSize),
    convertFontWeight(fontWeight),
    convertFontColor(fontColor),
  );
};

export default useConvertButtonStyle;
