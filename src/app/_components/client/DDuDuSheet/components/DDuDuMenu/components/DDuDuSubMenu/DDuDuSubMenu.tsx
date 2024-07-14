import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

interface DDuDuSubMenuProps {
  isDDuDuDateNow: boolean;
  status: "COMPLETE" | "UNCOMPLETED";
  handleSelectDifferentDate: () => void;
  handleAlarmSetting: () => void;
}

const DDuDuSubMenu = ({
  isDDuDuDateNow,
  status,
  handleSelectDifferentDate,
  handleAlarmSetting,
}: DDuDuSubMenuProps) => {
  return (
    <div className="flex w-full max-w-[50rem] flex-col gap-[1.6rem]">
      {status === "COMPLETE" && (
        <>
          <SheetButton
            Icon={<ExampleIcon />}
            title="오늘 또 하기"
            buttonType="sub"
            rightPlace={<p>5 일전</p>}
          />
          <SheetButton
            Icon={<ExampleIcon />}
            title="다른날 또 하기"
            buttonType="sub"
            onClick={handleSelectDifferentDate}
          />
          <SheetButton
            Icon={<ExampleIcon />}
            title="날짜 바꾸기"
            buttonType="sub"
            onClick={handleSelectDifferentDate}
          />
        </>
      )}
      {status === "UNCOMPLETED" && isDDuDuDateNow && (
        <>
          <SheetButton
            Icon={<ExampleIcon />}
            title="알림 설정하기"
            buttonType="sub"
            rightPlace={<p>5 일전</p>}
            onClick={handleAlarmSetting}
          />
          <SheetButton
            Icon={<ExampleIcon />}
            title="미루기"
            buttonType="sub"
            onClick={handleSelectDifferentDate}
          />
        </>
      )}
      {status === "UNCOMPLETED" && !isDDuDuDateNow && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="오늘 다시 하기"
          buttonType="sub"
          rightPlace={<p>5 일전</p>}
        />
      )}
      {status === "UNCOMPLETED" && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="다른날 반복하기"
          buttonType="sub"
          onClick={handleSelectDifferentDate}
        />
      )}
    </div>
  );
};

export default DDuDuSubMenu;
