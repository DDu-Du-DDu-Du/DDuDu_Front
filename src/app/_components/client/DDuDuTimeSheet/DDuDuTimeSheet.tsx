"use client";

import styles from "./DDuDuTimeSheet.module.css";

import { DDuDuTimeRangeType, DDuDuTimeType } from "@/app/(route)/feed/feed.types";

import { BottomSheet } from "../BottomSheet";
import { DDUDU_TIME_SHEET } from "./DDuDuTimeSheet.constants";
import { useTimeUpdate } from "./hooks";

interface DDuDuTimeSheetProps {
  currentDDuDuTime: DDuDuTimeType;
  onChangeDDuDuTime: (selectedTime: DDuDuTimeRangeType) => void;
  handleDDuDuTimeSheetToggleOff: () => void;
}

const DDuDuTimeSheet = ({
  currentDDuDuTime,
  onChangeDDuDuTime,
  handleDDuDuTimeSheetToggleOff,
}: DDuDuTimeSheetProps) => {
  const {
    beginHour,
    beginMin,
    endHour,
    endMin,
    isErrorMessage,
    handleDDuDuTimeChange,
    handleChangeBeginHour,
    handleChangeBeginMin,
    handleChangeEndHour,
    handleChangeEndMin,
  } = useTimeUpdate({ currentDDuDuTime, onChangeDDuDuTime });

  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
      onClose={handleDDuDuTimeSheetToggleOff}
    >
      <div className="flex flex-col p-[2.4rem]">
        <div className="flex-1">
          <h3 className="mb-[0.6rem] font-medium text-size15">투두시간 설정</h3>

          <div className="flex bg-white px-[1.6rem] py-[1.8rem] mb-[1rem] rounded-radius10">
            <div className="flex-1">
              <strong className="block text-size13 font-regular mb-[0.5rem]">시작시간</strong>
              <div className="flex">
                <div className="mr-[2.2rem]">
                  <select
                    className={styles.select}
                    defaultValue={beginHour || 0}
                    onChange={handleChangeBeginHour}
                  >
                    <option value={0}>0</option>
                    {Array.from({ length: 23 }, (_, index) => (
                      <option
                        key={index}
                        value={index + 1}
                      >
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <span className="pl-[0.5rem]">시</span>
                </div>
                <div>
                  <select
                    className={styles.select}
                    defaultValue={beginMin || 0}
                    onChange={handleChangeBeginMin}
                  >
                    {Array.from({ length: 60 }, (_, index) => (
                      <option
                        key={index}
                        value={index}
                      >
                        {index}
                      </option>
                    ))}
                  </select>
                  <span className="pl-[0.5rem]">분</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <strong className="block text-size13 font-regular mb-[0.5rem]">종료시간</strong>
              <div className="flex">
                <div className="mr-[2.2rem]">
                  <select
                    className={styles.select}
                    defaultValue={endHour || 0}
                    onChange={handleChangeEndHour}
                  >
                    <option value={0}>0</option>
                    {Array.from({ length: 23 }, (_, index) => (
                      <option
                        key={index}
                        value={index + 1}
                      >
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <span className="pl-[0.5rem]">시</span>
                </div>
                <div>
                  <select
                    className={styles.select}
                    defaultValue={endMin || 0}
                    onChange={handleChangeEndMin}
                  >
                    {Array.from({ length: 60 }, (_, index) => (
                      <option
                        key={index}
                        value={index}
                      >
                        {index}
                      </option>
                    ))}
                  </select>
                  <span className="pl-[0.5rem]">분</span>
                </div>
              </div>
            </div>
          </div>
          {isErrorMessage && (
            <p className="text-example_red_500">{DDUDU_TIME_SHEET.TIME_RANGE_ERROR_MESSAGE}</p>
          )}
          <button
            onClick={handleDDuDuTimeChange}
            className="w-full h-[5.6rem] bg-example_gray_700 rounded-radius15 mt-[2rem]"
          >
            확인
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
export default DDuDuTimeSheet;
