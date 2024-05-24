"use client";

import React from "react";

import { useMonthlyGoal } from "./hooks";

interface MonthlyGoalProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MonthlyGoal = ({ value, onChange, onBlur }: MonthlyGoalProps) => {
  const { textareaRef, isFocused, handleFocus, handleBlur } = useMonthlyGoal({ value, onBlur });

  // TODO: textarea 세로 중앙 정렬, 최소 높이 4.6rem으로 설정(지금은 넘음)
  return (
    <div className="relative w-[31.2rem] h-full flex items-center justify-center">
      {isFocused && (
        <div className="fixed inset-0 flex items-center justify-center z-monthly_goal_overlay">
          <div className="bg-black_500 bg-opacity-20 w-[60rem] h-full"></div>
        </div>
      )}
      <textarea
        ref={textareaRef}
        placeholder="월 별 목표를 설정해보세요!"
        className="relative z-monthly_goal_textarea w-full min-h-[4.6rem] p-6 bg-example_gray_100 focus:outline-none rounded-radius10 text-size11 font-medium resize-none leading-[1.85] box-border"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default MonthlyGoal;
