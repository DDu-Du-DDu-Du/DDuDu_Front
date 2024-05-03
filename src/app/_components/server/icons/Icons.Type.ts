import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  className?: string;
}
