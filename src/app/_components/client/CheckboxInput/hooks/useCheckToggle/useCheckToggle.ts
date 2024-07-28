import { useEffect, useState } from "react";

interface UseCheckToggleProps {
  isCheckedList: string[];
  value: string;
}

const useCheckToggle = ({ isCheckedList, value }: UseCheckToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isCheckedList) {
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
