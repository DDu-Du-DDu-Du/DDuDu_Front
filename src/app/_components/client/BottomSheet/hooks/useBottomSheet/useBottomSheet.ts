"use client";

import { useCallback, useState } from "react";

const useBottomSheet = () => {
  const [isShow, setIsShow] = useState(false);

  const handleCloseSheet = useCallback(() => {
    setIsShow(false);
  }, []);

  const handleOpenSheet = useCallback(() => {
    setIsShow(true);
  }, []);

  return {
    isShow,
    handleOpenSheet,
    handleCloseSheet,
  };
};

export default useBottomSheet;
