import { useRef, useState } from "react";

interface UseMonthlyGoalProps {
  value: string;
  onBlur?: () => void;
}

const useMonthlyGoal = ({ onBlur }: UseMonthlyGoalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight / 10}rem`;
    }
    if (onBlur) onBlur();
  };

  return {
    textareaRef,
    isFocused,
    handleFocus,
    handleBlur,
  };
};

export default useMonthlyGoal;
