import { useCallback, useEffect, useState } from "react";

interface UseSheetAnimationStateProps {
  isShow: boolean;
}

const useSheetAnimationState = ({ isShow }: UseSheetAnimationStateProps) => {
  const [activePortal, setActivePortal] = useState(isShow);
  const [isOpenSheet, setIsOpenSheet] = useState(isShow);

  useEffect(() => {
    if (isShow) {
      setActivePortal(true);
      setIsOpenSheet(true);
      return;
    }

    setIsOpenSheet(false);
  }, [isShow]);

  const handleUnActivePortal = useCallback(() => {
    setActivePortal(false);
  }, []);

  return {
    activePortal,
    isOpenSheet,
    handleUnActivePortal,
  };
};

export default useSheetAnimationState;
