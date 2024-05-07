import SheetButton from "@/app/_components/client/SheetButton/SheetButton";

const DDuDuSubMenu = () => {
  return (
    <div className="w-full max-w-[50rem] flex flex-col gap-[1.6rem]">
      <SheetButton
        title="알림 설정하기"
        buttonType="small"
        rightPlace={<p>5 일전</p>}
      />
      <SheetButton
        title="다른날 반복하기"
        buttonType="small"
      />
      <SheetButton
        title="미루기"
        buttonType="small"
      />
    </div>
  );
};

export default DDuDuSubMenu;
