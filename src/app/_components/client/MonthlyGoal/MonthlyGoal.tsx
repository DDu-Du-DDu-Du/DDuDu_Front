"use client";

import React, { useEffect, useRef } from "react";

interface MonthlyGoalProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MonthlyGoal = ({ value, onChange, onBlur }: MonthlyGoalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight / 10}rem`;
    }
  }, [value]);

  // TODO: textarea 세로 중앙 정렬, 최소 높이 4.6rem으로 설정(지금은 넘음)
  return (
    <div className="w-[31.2rem] h-full flex items-center justify-center">
      <textarea
        ref={textareaRef}
        placeholder="월 별 목표를 설정해보세요!"
        className="w-full min-h-[4.6rem] p-6 bg-example_gray_100 focus:outline-none rounded-radius10 text-size11 font-medium resize-none leading-[1.85] box-border"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MonthlyGoal;
