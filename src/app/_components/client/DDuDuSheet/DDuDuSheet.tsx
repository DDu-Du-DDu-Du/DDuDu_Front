import { BottomSheet } from "../BottomSheet";
import { DDuDuMenu } from "./components";

const DDuDuSheet = () => {
  return (
    <BottomSheet
      isShow
      defaultHeight={"fit-content"}
    >
      <DDuDuMenu />
    </BottomSheet>
  );
};

export default DDuDuSheet;
