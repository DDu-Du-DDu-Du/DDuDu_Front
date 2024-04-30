import { HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

interface TestProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const StorybookTestComponent = ({ className = "", ...rest }: TestProps) => {
  return (
    <div
      className={twMerge(
        "h-[8rem] w-[20rem] border-2 border-gray-500 flex items-center justify-center text-lg font-bold rounded-lg",
        className,
      )}
      {...rest}
    >
      작성 예시용 컴포넌트
    </div>
  );
};

export default StorybookTestComponent;
