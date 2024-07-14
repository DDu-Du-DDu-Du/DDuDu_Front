"use client";

import styles from "./AlarmSheet.module.css";

import { useState } from "react";

import { BottomSheet } from "../BottomSheet";

import { twJoin } from "tailwind-merge";

const AlarmSheet = () => {
  const [alarmState, setAlarmState] = useState(false);

  const handleAlarmStateToggle = () => {
    setAlarmState((prevState) => !prevState);
  };

  const getLastDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const currentMonthLastDate = getLastDayOfMonth(year, month);

  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
    >
      <div className="flex flex-col p-[2.4rem]">
        <div className="flex-1">
          <h3 className="mb-[0.6rem] font-medium text-size15">알림설정</h3>
          <div className="flex justify-between items-center bg-white mb-[1.2rem] px-[1.6rem] rounded-radius10">
            <strong className="text-size13 font-regular">미리 알림 켜놓기</strong>
            <div
              className="py-[1rem] cursor-pointer"
              onClick={handleAlarmStateToggle}
            >
              <div
                className={twJoin(
                  "relative w-[5.6rem] h-[2.8rem] rounded-[5rem] transition",
                  alarmState && "bg-example_gray_700",
                  !alarmState && "bg-example_gray_100",
                )}
              >
                <div
                  className={twJoin(
                    "absolute top-[0.4rem] size-[2rem] bg-white rounded-circle transition",
                    alarmState && "translate-x-[3.2rem]",
                    !alarmState && "translate-x-[0.4rem]",
                  )}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex bg-white px-[1.6rem] py-[1.8rem] rounded-radius10">
            <div className="mr-[2.2rem]">
              <select className={styles.select}>
                {Array.from({ length: currentMonthLastDate - day + 1 }, (_, index) => (
                  <option
                    key={index}
                    value={index + day}
                  >
                    {index + day}
                  </option>
                ))}
              </select>
              <span className="pl-[0.8rem]">일</span>
            </div>
            <div className="mr-[2.2rem]">
              <select className={styles.select}>
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
              <span className="pl-[0.8rem]">시</span>
            </div>
            <div>
              <select className={styles.select}>
                {Array.from({ length: 60 }, (_, index) => (
                  <option
                    key={index}
                    value={index}
                  >
                    {index}
                  </option>
                ))}
              </select>
              <span className="pl-[0.8rem]">분</span>
            </div>
          </div>
          <button
            // onClick={onClose}
            className="w-full h-[5.6rem] bg-example_gray_700 rounded-radius15 mt-[2rem]"
          >
            확인
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AlarmSheet;
