import { useMemo } from "react";

import { BottomSheetStateType } from "../../BottomSheet.type";

interface UseChangeSheetHeightProps {
  sheetState: BottomSheetStateType;
  defaultHeight: string | number;
  maxHeight: string | number;
}

const useChangeSheetHeight = ({
  sheetState,
  defaultHeight,
  maxHeight,
}: UseChangeSheetHeightProps) => {
  const height = useMemo(() => {
    switch (sheetState) {
      case "default":
        return defaultHeight;

      case "full":
        return maxHeight;

      case "close":
        return 0;

      default:
        return defaultHeight;
    }
  }, [defaultHeight, maxHeight, sheetState]);

  return height;
};

export default useChangeSheetHeight;
