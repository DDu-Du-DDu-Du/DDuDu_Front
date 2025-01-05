import { SheetButton } from "@/app/_components/client";
import { AlarmIcon, AnotherDayIcon, DailyIcon } from "@/app/_components/server/icons/";
import { formatDateToYYYYMMDD } from "@/app/_utils";

import { DDuDuDetailType } from "../../DDuDuMenu";

interface DDuDuSubMenuProps {
  dduduDetail: DDuDuDetailType;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  onRepeatCurrentDate: () => void;
}

const DDuDuSubMenu = ({
  dduduDetail,
  handleSelectDifferentDate,
  handleAlarmSetting,
  onRepeatCurrentDate,
}: DDuDuSubMenuProps) => {
  const { scheduledOn, status } = dduduDetail;

  const isDDuDuDateNow = formatDateToYYYYMMDD(new Date()) === scheduledOn;

  const handleRepeatDDuDuCurrentDate = () => {
    onRepeatCurrentDate();
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
            Icon={<DailyIcon />}
            title="오늘 또 하기"
            buttonType="sub"
            onClick={handleRepeatDDuDuCurrentDate}
          />
          <SheetButton
            Icon={<AnotherDayIcon fill="#FDB541" />}
            title="다른날 또 하기"
            buttonType="sub"
            onClick={handleRepeatDDuDuDate}
          />
          <SheetButton
            Icon={<AnotherDayIcon />}
            title="날짜 바꾸기"
            buttonType="sub"
            onClick={handleChangeDDuDuDate}
          />
        </>
      )}
      {status === "UNCOMPLETED" && isDDuDuDateNow && (
        <>
          <SheetButton
            Icon={<AlarmIcon />}
            title="알림 설정하기"
            buttonType="sub"
            rightPlace={<p>없음</p>}
            onClick={handleAlarmSetting}
          />
          <SheetButton
            Icon={<AnotherDayIcon fill="#FDB541" />}
            title="미루기"
            buttonType="sub"
            onClick={handleChangeDDuDuDate}
          />
        </>
      )}
      {status === "UNCOMPLETED" && !isDDuDuDateNow && (
        <SheetButton
          Icon={<DailyIcon />}
          title="오늘 다시 하기"
          buttonType="sub"
          onClick={handleRepeatDDuDuCurrentDate}
        />
      )}
      {status === "UNCOMPLETED" && (
        <SheetButton
          Icon={<AnotherDayIcon />}
          title="다른날 반복하기"
          buttonType="sub"
          onClick={handleRepeatDDuDuDate}
        />
      )}
    </div>
  );
};

export default DDuDuSubMenu;
