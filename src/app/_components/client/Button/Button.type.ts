import React from "react";

import { HTMLMotionProps } from "framer-motion";

export type ButtonRadiusType = "basic" | "decreased";
export type ButtonBorderType = "green" | "none";
export type ButtonFontSizeType = "large" | "medium";
export type ButtonFontWeightType = "regular" | "bold";
export type ButtonFontColorType = "white" | "black";
export type ButtonBackgroundColorType = "yellow" | "orange" | "red";

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
  disabled?: boolean;
}
