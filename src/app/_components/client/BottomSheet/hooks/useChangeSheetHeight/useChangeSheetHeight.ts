import { useEffect, useState } from "react";

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
        setHeight(0);
        break;

      default:
        setHeight(defaultHeight);
        break;
    }
  }, [defaultHeight, maxHeight, sheetState]);

  return height;
};

export default useChangeSheetHeight;
