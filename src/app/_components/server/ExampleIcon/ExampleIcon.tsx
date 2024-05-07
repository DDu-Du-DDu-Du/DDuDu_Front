import tailwindConfig from "@/../tailwind.config";

import { QuestionIcon } from "../icons";

import resolveConfig from "tailwindcss/resolveConfig";

interface ExampleIconProps {
  size?: string | number;
}

const ExampleIcon = ({ size = 32 }: ExampleIconProps) => {
  const { theme } = resolveConfig(tailwindConfig);

  return (
    <div
      className=" bg-example_gray_700 rounded-circle flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <QuestionIcon
        size={"60%"}
        fill={theme.colors["example_gray_900"]}
      />
    </div>
  );
};

export default ExampleIcon;
