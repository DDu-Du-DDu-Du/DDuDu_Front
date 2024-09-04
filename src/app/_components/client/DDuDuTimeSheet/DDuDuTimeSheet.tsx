"use client";

import styles from "./DDuDuTimeSheet.module.css";

import { useEffect, useState } from "react";

import { DDuDUTimeRangeType, DDuDuTimeType } from "@/app/(route)/feed/feed.types";

import { BottomSheet } from "../BottomSheet";

interface DDuDuTimeSheetProps {
  currentDDuDuTime: DDuDuTimeType;
  onChangeDDuDUTime: (selectedTime: DDuDUTimeRangeType) => void;
  handleDDuDuTimeSheetToggleOff: () => void;
}

const DDuDuTimeSheet = ({
  currentDDuDuTime,
  onChangeDDuDUTime,
  handleDDuDuTimeSheetToggleOff,
}: DDuDuTimeSheetProps) => {
  const { beginAt, endAt } = currentDDuDuTime;

  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [beginHour, setBeginHour] = useState(0);
  const [beginMin, setBeginMin] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMin, setEndMin] = useState(0);

  useEffect(() => {
    if (!beginAt || !endAt) {
      return;
    }

    const [beginHour, beginMin] = beginAt.split(":").map(Number);
    const [endHour, endMin] = endAt.split(":").map(Number);

    setBeginHour(beginHour);
    setBeginMin(beginMin);
    setEndHour(endHour);
    setEndMin(endMin);
  }, [beginAt, endAt]);

  const handleDDuDuTimeChange = () => {
    const beginTime = beginHour * 60 + beginMin;
    const endTime = endHour * 60 + endMin;

    if (beginTime > endTime) {
      setIsErrorMessage(true);
      return;
    }

    setIsErrorMessage(false);
    onChangeDDuDUTime({ beginHour, beginMin, endHour, endMin });
  };

  const handleChangeBeginHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBeginHour(Number(event.target.value));
  };
  const handleChangeBeginMin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBeginMin(Number(event.target.value));
  };
  const handleChangeEndHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndHour(Number(event.target.value));
  };
  const handleChangeEndMin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndMin(Number(event.target.value));
  };

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
            <p className="text-example_red_500">종료 시간이 시작 시간 보다 작을 수 없습니다.</p>
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
