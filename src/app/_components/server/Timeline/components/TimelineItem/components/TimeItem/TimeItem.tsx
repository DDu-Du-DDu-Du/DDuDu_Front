"use client";

import tailwindConfig from "@/../tailwind.config";

import { motion } from "framer-motion";
import resolveConfig from "tailwindcss/resolveConfig";

interface TimeItemProps {
  name: string;
  startTime: string;
  endTime: string;
  isLastItem?: boolean;
  isCompleted?: boolean;
  themeColor: string;
}

const TimeItem = ({
  name,
  startTime,
  endTime,
  isLastItem = false,
  isCompleted = false,
  themeColor,
}: TimeItemProps) => {
  const { theme } = resolveConfig(tailwindConfig);

  return (
    <li className="relative w-full">
      <div className="absolute right-[100%] top-0 flex h-full w-[5rem] items-center justify-center">
        {/* 아이콘 */}
        <div className="absolute top-0 z-timeline_icon flex items-center justify-center h-[5.7rem]">
          <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-circle bg-example_gray_900">
            <div className="h-[1.6rem] w-[1.6rem] rounded-circle bg-white flex items-center justify-center">
              {/*              
                TODO

                추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기 
              */}
              {true && <div className="h-[1.2rem] w-[1.2rem] bg-example_gray_900 rounded-circle" />}
            </div>
          </div>
        </div>

        {!isLastItem && (
          <hr
            className="absolute top-[3rem] z-timeline_line h-full w-[0.3rem]"
            /*
              TODO

              추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기
            */
            style={{
              backgroundColor: isCompleted ? themeColor : theme.colors["example_gray_900"],
            }}
          />
        )}
      </div>

      {/* DDuDuItem */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full min-h-[5.7rem] flex flex-col rounded-radius15 px-[1.6rem] py-[1.2rem] shadow-example_shadow"
        type="button"
      >
        <p className="text-size14">{name}</p>
        <p className="text-size11 text-example_gray_900">{`${startTime} - ${endTime}`}</p>
      </motion.button>
    </li>
  );
};

export default TimeItem;
