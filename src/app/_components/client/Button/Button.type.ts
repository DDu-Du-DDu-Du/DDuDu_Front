import React from "react";

import { HTMLMotionProps } from "framer-motion";

export type ButtonRadiusType = "0.94rem" | "0.625rem";
export type ButtonBorderType = "green" | "none";
export type ButtonFontSizeType = "0.94rem" | "0.81rem";
export type ButtonFontWeightType = "regular" | "bold";
export type ButtonFontColorType = "white" | "black";
export type ButtonBackgroundColorType = "yellow" | "pink" | "blue";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  radius?: ButtonRadiusType;
  border?: ButtonBorderType;
  fontSize?: ButtonFontSizeType;
  fontWeight?: ButtonFontWeightType;
  fontColor?: ButtonFontColorType;
  backgroundColor?: ButtonBackgroundColorType;
  shadow?: boolean;
}
