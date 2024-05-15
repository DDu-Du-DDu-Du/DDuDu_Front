import { BottomSheet } from "../_components/client";
import CalenderBottomSheet from "../_components/client/CalenderBottomSheet/CalenderBottomSheet";

const Home = () => {
  return (
    <main className="h-full w-full">
      DDuDu
      <BottomSheet
        isShow
        defaultHeight="fit-content"
        maxHeight="fit-content"
      >
        <CalenderBottomSheet></CalenderBottomSheet>
      </BottomSheet>
    </main>
  );
};

export default Home;
