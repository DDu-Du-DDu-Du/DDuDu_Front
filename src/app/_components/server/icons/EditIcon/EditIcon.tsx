import { IconProps } from "../Icons.Type";

const EditIcon = ({ size = 24, fill = "#1363DE", className = "", ...rest }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <g clipPath="url(#clip0_504_471)">
        <path
          d="M1.172 19.1189C0.421803 19.8689 0.00022655 20.8861 0 21.9469L0 23.9999H2.053C3.11378 23.9997 4.13103 23.5781 4.881 22.8279L18.224 9.48488L14.515 5.77588L1.172 19.1189Z"
          fill={fill}
        />
        <path
          d="M23.145 0.855114C22.9014 0.61135 22.6123 0.41797 22.294 0.286031C21.9757 0.154092 21.6345 0.0861816 21.29 0.0861816C20.9454 0.0861816 20.6042 0.154092 20.2859 0.286031C19.9676 0.41797 19.6785 0.61135 19.435 0.855114L15.929 4.36211L19.638 8.07112L23.145 4.56511C23.3887 4.3216 23.5821 4.03244 23.714 3.71414C23.846 3.39585 23.9139 3.05467 23.9139 2.71011C23.9139 2.36556 23.846 2.02438 23.714 1.70609C23.5821 1.38779 23.3887 1.09863 23.145 0.855114Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_504_471">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EditIcon;
