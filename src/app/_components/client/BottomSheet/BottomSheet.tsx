import { BottomPortal } from "./components";

const BottomSheet = () => {
  return (
    <BottomPortal isShow>
      <div className="w-full h-[20rem] bg-slate-500 translate-y-10">BottomSheet</div>
    </BottomPortal>
  );
};

export default BottomSheet;
