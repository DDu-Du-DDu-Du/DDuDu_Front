import { IconProps } from "../Icons.Type";

const CheckIcon = ({ size = 32, fill = "black", className = "", ...rest }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill={fill}
      className={className}
      {...rest}
    >
      <path d="M382-208 122-468l90-90 170 170 366-366 90 90-456 456Z" />
    </svg>
  );
};

export default CheckIcon;
