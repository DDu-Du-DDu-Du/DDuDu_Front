import { useEffect, useState } from "react";

interface UseCheckToggleProps {
  isCheckedList: string[];
  value: string;
  checked: boolean;
}

const useCheckToggle = ({ isCheckedList, value, checked }: UseCheckToggleProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    if (!isCheckedList || !Array.isArray(isCheckedList)) {
      return;
    }

    const isChecked = isCheckedList.includes(value);

    setIsChecked(isChecked);
  }, [isCheckedList, value]);

  return {
    isChecked,
  };
};

export default useCheckToggle;
