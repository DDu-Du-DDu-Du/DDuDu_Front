import { useEffect, useState } from "react";

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

  const handleCloseSheet = () => {
    setActivePortal(false);
  };

  return {
    activePortal,
    isOpenSheet,
    handleCloseSheet,
  };
};

export default useSheetAnimationState;
