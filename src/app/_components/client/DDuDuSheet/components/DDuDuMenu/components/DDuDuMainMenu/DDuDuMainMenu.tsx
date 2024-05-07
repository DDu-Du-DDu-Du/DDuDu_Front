import { SheetButton } from "@/app/_components/client";

const DDuDuMainMenu = () => {
  return (
    <div className="w-full max-w-[50rem] flex gap-4">
      <SheetButton title="수정하기" />
      <SheetButton title="투두시간" />
      <SheetButton
        title="삭제하기"
        className="flex-grow-[1]"
      />
    </div>
  );
};

export default DDuDuMainMenu;
