"use client";

import tailwindConfig from "@/../tailwind.config";
import { MainTimeTableDDuDuType } from "@/app/_types/response/feed/feed";

import { hexConvertForRGBA } from "../../../../utils";

import { motion } from "framer-motion";
import resolveConfig from "tailwindcss/resolveConfig";

interface TimeItemProps {
  ddudu: MainTimeTableDDuDuType;
  isLastItem: boolean;
  onDDuDuCompleteToggle: (id: number) => void;
  handleDDuDuSheetOpen: (id: number) => void;
}

const TimeItem = ({
  ddudu,
  isLastItem,
  onDDuDuCompleteToggle,
  handleDDuDuSheetOpen,
}: TimeItemProps) => {
  const { id, name, status, beginAt, endAt } = ddudu;
  const { theme } = resolveConfig(tailwindConfig);

  const handleDDuDuCompleteToggle = () => {
    onDDuDuCompleteToggle(ddudu.id);
  };

  return (
    <li className="relative w-full">
      <div className="absolute right-[100%] top-0 flex h-full w-[5rem] items-center justify-center">
        {/* middle icon */}
        <div className="absolute top-0 z-timeline_icon flex items-center justify-center h-[5.7rem]">
          <div
            className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-circle cursor-pointer"
            style={{
              backgroundColor:
                status === "COMPLETE"
                  ? theme.colors["example_gray_700"]
                  : theme.colors["example_gray_700"],
            }}
            onClick={handleDDuDuCompleteToggle}
          >
            <div className="h-[1.6rem] w-[1.6rem] rounded-circle bg-white flex items-center justify-center">
              {/*              
                TODO

                추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기 
              */}
              {status === "COMPLETE" && (
                <div className="h-[1.2rem] w-[1.2rem] bg-example_gray_700 rounded-circle" />
              )}
            </div>
          </div>
        </div>

        {/* middle timeline */}
        {!isLastItem && (
          <hr
            className="absolute top-[3rem] z-timeline_line h-full w-[0.2rem]"
            /*
              TODO

              추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기
            */
            style={{
              backgroundColor:
                status === "COMPLETE"
                  ? theme.colors["example_gray_700"]
                  : theme.colors["example_gray_700"],
            }}
          />
        )}
      </div>

      {/* DDuDu */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full min-h-[5.7rem] flex flex-col rounded-radius15 px-[1.6rem] py-[1.2rem]"
        style={{
          backgroundColor: hexConvertForRGBA({
            /*              
              TODO

              추후 상단에 생성될 전체 목표 목록 스토어에서 일치하는 컬러 매칭하기 
            */
            hex: theme.colors["white_100"],
            alpha: 1,
          }),
        }}
        type="button"
        onClick={() => handleDDuDuSheetOpen(id)}
      >
        <p className="text-size14 font-regular">{name}</p>
        <p className="text-size11 font-light text-example_gray_700">{`${beginAt} - ${endAt}`}</p>
      </motion.button>
    </li>
  );
};

export default TimeItem;
