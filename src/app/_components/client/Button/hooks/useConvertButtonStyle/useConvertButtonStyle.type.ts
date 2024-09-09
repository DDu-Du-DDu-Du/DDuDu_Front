import {
  ButtonBackgroundColorType,
  ButtonBorderType,
  ButtonFontColorType,
  ButtonFontSizeType,
  ButtonFontWeightType,
  ButtonRadiusType,
} from "../../Button";

export interface UseConvertButtonStyleProps {
  radius: ButtonRadiusType;
  fontSize: ButtonFontSizeType;
  fontWeight: ButtonFontWeightType;
  fontColor: ButtonFontColorType;
  backgroundColor: ButtonBackgroundColorType;
  border: ButtonBorderType;
  shadow: boolean;
}
