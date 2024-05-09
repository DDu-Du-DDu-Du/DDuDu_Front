import { convertRadius } from "../../utils";
import { UseConvertButtonStyleProps } from "./useConvertButtonStyle.type";

import { twJoin } from "tailwind-merge";

const useConvertButtonStyle = ({ radius }: UseConvertButtonStyleProps) => {
  return twJoin(convertRadius(radius));
};

export default useConvertButtonStyle;
