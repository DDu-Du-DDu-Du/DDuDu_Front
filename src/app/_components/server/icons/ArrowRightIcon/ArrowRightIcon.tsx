import { IconProps } from "../Icons.Type";

const ArrowRightIcon = ({
  size = 32,
  fill = "black",
  stroke = "black",
  className = "",
  ...rest
}: IconProps) => {
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
        d="M1 17L11 9L0.999998 1"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ArrowRightIcon;
