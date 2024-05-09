import tailwindConfig from "@/../tailwind.config";

import { TIMELINE_ITEM_HEIGHT } from "../../../../Timeline.constants";

import { twJoin } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";

interface TimeItemProps {
  todo: string;
  startTime: string;
  endTime: string;
  isLastItem?: boolean;
  isCompleted?: boolean;
  themeColor: string;
}

const TimeItem = ({
  todo,
  startTime,
  endTime,
  isLastItem = false,
  isCompleted = false,
  themeColor,
}: TimeItemProps) => {
  const { theme } = resolveConfig(tailwindConfig);
  return (
    <li className="relative flex w-full flex-col rounded-radius15 px-[1.6rem] py-[1.2rem] shadow-example_shadow">
      <div className="absolute right-[100%] top-0 flex h-full w-[5rem] items-center justify-center">
        {/* 아이콘 */}
        <div
          className={twJoin(
            "absolute top-0 z-timeline_icon flex items-center justify-center",
            TIMELINE_ITEM_HEIGHT,
          )}
        >
          <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-circle bg-example_gray_900">
            <div
              className="h-[1.6rem] w-[1.6rem] rounded-circle bg-white"
              style={{
                backgroundColor: isCompleted ? themeColor : theme.colors["background"],
              }}
            />
          </div>
        </div>

        {/* 구분선 */}
        {!isLastItem && (
          <hr className="absolute top-[3rem] z-timeline_line h-full w-[0.3rem] bg-example_gray_900" />
        )}
      </div>

      {/* DDuDuItem */}
      <p className="text-size14">{todo}</p>
      <p className="text-size11 text-example_gray_900">{`${startTime} - ${endTime}`}</p>
    </li>
  );
};

export default TimeItem;
