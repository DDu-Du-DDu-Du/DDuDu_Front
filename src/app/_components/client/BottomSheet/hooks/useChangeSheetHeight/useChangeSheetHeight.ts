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
};

export default useChangeSheetHeight;
