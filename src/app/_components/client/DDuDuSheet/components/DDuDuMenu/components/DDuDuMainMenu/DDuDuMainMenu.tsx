import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

const DDuDuMainMenu = () => {
  return (
    <div className="flex w-full max-w-[50rem] gap-4">
      <SheetButton
        Icon={<ExampleIcon size={32} />}
        title="수정하기"
      />
      <SheetButton
        Icon={<ExampleIcon />}
        title="투두시간"
      />
      <SheetButton
        Icon={<ExampleIcon />}
        title="삭제하기"
        className="flex-grow-[1]"
      />
    </div>
  );
};

export default DDuDuMainMenu;
