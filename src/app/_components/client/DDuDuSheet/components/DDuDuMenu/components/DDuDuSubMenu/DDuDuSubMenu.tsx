import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

const DDuDuSubMenu = () => {
  return (
    <div className="w-full max-w-[50rem] flex flex-col gap-[1.6rem]">
      <SheetButton
        Icon={<ExampleIcon />}
        title="알림 설정하기"
        buttonType="small"
        rightPlace={<p>5 일전</p>}
      />
      <SheetButton
        Icon={<ExampleIcon />}
        title="다른날 반복하기"
        buttonType="small"
      />
      <SheetButton
        Icon={<ExampleIcon />}
        title="미루기"
        buttonType="small"
      />
    </div>
  );
};

export default DDuDuSubMenu;
