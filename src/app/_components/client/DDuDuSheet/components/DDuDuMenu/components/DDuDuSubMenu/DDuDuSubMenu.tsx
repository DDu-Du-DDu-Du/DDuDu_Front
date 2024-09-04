import { SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";
import { formatDateToYYYYMMDD } from "@/app/_utils";

import { DDuDuDetailType } from "../../DDuDuMenu";

interface DDuDuSubMenuProps {
  dduduDetail: DDuDuDetailType;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleRepeatCurrentDate: () => void;
}

const DDuDuSubMenu = ({
  dduduDetail,
  handleSelectDifferentDate,
  handleAlarmSetting,
  handleRepeatCurrentDate,
}: DDuDuSubMenuProps) => {
  const { scheduledOn, status } = dduduDetail;

  const isDDuDuDateNow = formatDateToYYYYMMDD(new Date()) === scheduledOn;

  const handleRepeatDDuDuCurrentDate = () => {
    handleRepeatCurrentDate();
  };

  const handleChangeDDuDuDate = () => {
    handleSelectDifferentDate("change", scheduledOn);
  };

  const handleRepeatDDuDuDate = () => {
    handleSelectDifferentDate("repeat", scheduledOn);
  };

  return (
    <div className="flex w-full max-w-[50rem] flex-col gap-[1.6rem]">
      {status === "COMPLETE" && (
        <>
          <SheetButton
            Icon={<ExampleIcon />}
            title="오늘 또 하기"
            buttonType="sub"
            rightPlace={<p>5 일전</p>}
            onClick={handleRepeatDDuDuCurrentDate}
          />
          <SheetButton
            Icon={<ExampleIcon />}
            title="다른날 또 하기"
            buttonType="sub"
            onClick={handleRepeatDDuDuDate}
          />
          <SheetButton
            Icon={<ExampleIcon />}
            title="날짜 바꾸기"
            buttonType="sub"
            onClick={handleChangeDDuDuDate}
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
            onClick={handleChangeDDuDuDate}
          />
        </>
      )}
      {status === "UNCOMPLETED" && !isDDuDuDateNow && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="오늘 다시 하기"
          buttonType="sub"
          rightPlace={<p>5 일전</p>}
          onClick={handleRepeatDDuDuCurrentDate}
        />
      )}
      {status === "UNCOMPLETED" && (
        <SheetButton
          Icon={<ExampleIcon />}
          title="다른날 반복하기"
          buttonType="sub"
          onClick={handleRepeatDDuDuDate}
        />
      )}
    </div>
  );
};

export default DDuDuSubMenu;
