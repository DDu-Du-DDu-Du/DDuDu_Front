"use client";

import React, { useEffect, useRef, useState } from "react";

interface MonthlyGoalProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MonthlyGoal = ({ value, onChange, onBlur }: MonthlyGoalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight / 10}rem`;
    }
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  // TODO: textarea 세로 중앙 정렬, 최소 높이 4.6rem으로 설정(지금은 넘음)
  return (
    <div className="relative w-[31.2rem] h-full flex items-center justify-center">
      {isFocused && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-black_500 bg-opacity-20 w-[60rem] h-full"></div>
        </div>
      )}
      <textarea
        ref={textareaRef}
        placeholder="월 별 목표를 설정해보세요!"
        className="relative z-50 w-full min-h-[4.6rem] p-6 bg-example_gray_100 focus:outline-none rounded-radius10 text-size11 font-medium resize-none leading-[1.85] box-border"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default MonthlyGoal;
