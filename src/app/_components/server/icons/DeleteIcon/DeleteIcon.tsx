import { IconProps } from "../Icons.Type";

const DeleteIcon = ({ fill = "#ED4044", className = "", ...rest }: IconProps) => {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M15 4V2C15 1.46957 14.7893 0.960859 14.4142 0.585786C14.0391 0.210714 13.5304 0 13 0L7 0C6.46957 0 5.96086 0.210714 5.58579 0.585786C5.21071 0.960859 5 1.46957 5 2V4H0V6H2V21C2 21.7956 2.31607 22.5587 2.87868 23.1213C3.44129 23.6839 4.20435 24 5 24H15C15.7956 24 16.5587 23.6839 17.1213 23.1213C17.6839 22.5587 18 21.7956 18 21V6H20V4H15ZM9 17H7V11H9V17ZM13 17H11V11H13V17ZM13 4H7V2H13V4Z"
        fill={fill}
      />
    </svg>
  );
};

export default DeleteIcon;
