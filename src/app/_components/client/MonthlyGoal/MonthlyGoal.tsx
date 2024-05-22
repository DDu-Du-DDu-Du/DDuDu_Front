"use-client";

import React from "react";

interface MonthlyGoalProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MonthlyGoal = ({ value, onChange, onBlur }: MonthlyGoalProps) => {
  return (
    <div className="w-[31.2rem] h-[4.6rem] flex justify-center items-center">
      <textarea
        placeholder="월 별 목표를 설정해보세요!"
        className="w-full h-full p-4 bg-example_gray_100 focus:outline-none rounded-radius10 text-size11 resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MonthlyGoal;
