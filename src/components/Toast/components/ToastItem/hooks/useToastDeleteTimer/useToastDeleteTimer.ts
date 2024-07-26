import { useEffect, useState } from "react";

interface UseToggleTimerProps {
  time: number;
}

const useToastDeleteTimer = ({ time }: UseToggleTimerProps) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsShow(false);
    }, time);

    return () => {
      clearTimeout(timeId);
    };
  }, [time]);

  return isShow;
};

export default useToastDeleteTimer;
