export type ButtonRadiusType = "0.94rem" | "0.625rem";
export type ButtonBorderType = "green" | "none";
export type ButtonFontSizeType = "0.94rem" | "0.81rem";
export type ButtonFontWeightType = "regular" | "bold";
export type ButtonFontColorType = "white" | "black";
export type ButtonBackgroundColorType = "yellow" | "pink" | "blue";

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  radius?: ButtonRadiusType;
  border?: ButtonBorderType;
  fontSize?: ButtonFontSizeType;
  fontWeight?: ButtonFontWeightType;
  fontColor?: ButtonFontColorType;
  backgroundColor?: ButtonBackgroundColorType;
  shadow?: boolean;
}
