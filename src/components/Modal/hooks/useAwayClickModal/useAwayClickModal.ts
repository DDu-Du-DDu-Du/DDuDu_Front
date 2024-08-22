import { MouseEvent, useCallback } from "react";

interface UseAwayClickModalProps {
  callback?: () => void;
}

const useAwayClickModal = ({ callback }: UseAwayClickModalProps) => {
  const handleCloseModal = useCallback(
    ({ target, currentTarget }: MouseEvent) => {
      if (!callback) {
        return;
      }

      if (target !== currentTarget) {
        return;
      }

      callback();
    },
    [callback],
  );

  return handleCloseModal;
};

export default useAwayClickModal;
