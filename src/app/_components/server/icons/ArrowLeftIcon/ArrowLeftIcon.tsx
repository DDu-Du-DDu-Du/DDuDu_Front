import { IconProps } from "../Icons.Type";

const ArrowLeftIcon = ({ size = 32, fill = "black", className = "", ...rest }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      fill={fill}
      className={className}
      viewBox="0 0 10 20"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 1L2 9L12 17"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
