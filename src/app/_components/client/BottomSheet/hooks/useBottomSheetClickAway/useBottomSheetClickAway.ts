import { useEffect } from "react";

interface UseBottomSheetClickAwayProps {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
}

const useBottomSheetClickAway = ({ ref, callback }: UseBottomSheetClickAwayProps) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export default useBottomSheetClickAway;
