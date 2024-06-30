import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

interface DDuDuSheetProps {
  onClose: () => void;
}

const DDuDuSheet = ({ onClose }: DDuDuSheetProps) => {
  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
      maxHeight={"fit-content"}
      onClose={onClose}
    >
      <DDuDuMenu />
    </BottomSheet>
  );
};

export default DDuDuSheet;
