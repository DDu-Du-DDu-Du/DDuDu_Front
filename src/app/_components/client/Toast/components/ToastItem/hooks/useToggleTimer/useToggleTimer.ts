"use client";

import { useEffect, useState } from "react";

interface UseToggleTimerProps {
  time: number;
}

const useToggleTimer = ({ time }: UseToggleTimerProps) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, time);
  }, [time]);

  return isShow;
};

export default useToggleTimer;
