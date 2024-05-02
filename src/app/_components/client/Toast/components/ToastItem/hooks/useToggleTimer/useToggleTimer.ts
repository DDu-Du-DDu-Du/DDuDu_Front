"use client";

import { useEffect, useState } from "react";

interface UseToggleTimer {
  time: number;
}

const useToggleTimer = ({ time }: UseToggleTimer) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, time);
  }, [time]);

  return isShow;
};

export default useToggleTimer;
