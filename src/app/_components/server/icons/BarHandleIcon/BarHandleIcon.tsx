import { IconProps } from "../Icons.Type";

const BarHandleIcon = ({ size = 32, className, fill = "black", ...rest }: IconProps) => {
  return (
    <svg
      width={size}
      height="6"
      viewBox="0 0 100 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <rect
        width={size}
        height="6"
        rx="2"
        fill={fill}
      />
    </svg>
  );
};

export default BarHandleIcon;
