import { IconProps } from "../Icons.Type";

const PlusIcon = ({ size = 16, fill = "none", className = "", ...rest }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8 0V16"
        stroke="black"
        strokeWidth="1.5"
      />
      <path
        d="M16 8L-2.98023e-07 8"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default PlusIcon;
