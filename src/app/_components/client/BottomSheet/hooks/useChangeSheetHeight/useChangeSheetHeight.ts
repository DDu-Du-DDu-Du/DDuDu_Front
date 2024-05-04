import { useEffect, useState } from "react";

import { BottomSheetStateType } from "../../BottomSheet.type";

interface UseChangeSheetHeightProps {
  sheetState: BottomSheetStateType;
  defaultHeight: string | number;
  maxHeight: string | number;
  handelCloseSheet: () => void;
}

const useChangeSheetHeight = ({
  sheetState,
  defaultHeight,
  maxHeight,
  handelCloseSheet,
}: UseChangeSheetHeightProps) => {
  const [height, setHeight] = useState<string | number>(0);

  useEffect(() => {
    switch (sheetState) {
      case "default":
        setHeight(defaultHeight);
        break;

      case "full":
        setHeight(maxHeight);
        break;

      case "close":
        handelCloseSheet();
        setHeight(0);
        break;

      default:
        setHeight(defaultHeight);
        break;
    }
  }, [defaultHeight, handelCloseSheet, maxHeight, sheetState]);

  return height;
};

export default useChangeSheetHeight;
