import { IconProps } from "../Icons.Type";

const ChevronLeftIcon = ({ size = 32, fill = "black", className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );
};

export default ChevronLeftIcon;
