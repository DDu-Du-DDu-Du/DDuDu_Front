import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { getDDuDuDetail } from "@/app/_services/client";
import { useQuery } from "@tanstack/react-query";

import { DDuDuMainMenu, DDuDuSubMenu } from "./components";

import { useSession } from "next-auth/react";

export interface DDuDuDetailType {
  id: number;
  name: string;
  status: "UNCOMPLETED" | "COMPLETE";
  goalId: number;
  repeatDduduId: number;
  scheduledOn: string;
  beginAt: string | null;
  endAt: string | null;
}

interface DDuDuMenuProps {
  type: "ddudu" | "schedule";
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  onDeleteDDuDu: (id: number) => void;
  handleDDuDuSheetToggleOff: () => void;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  onRepeatCurrentDate: () => void;
}

export const DDuDuMenu = ({
  type,
  dduduId,
  handleEditDDuDu,
  onDeleteDDuDu,
  handleDDuDuSheetToggleOff,
  handleSelectDifferentDate,
  handleAlarmSetting,
  handleDDuDuTimeSetting,
  onRepeatCurrentDate,
}: DDuDuMenuProps) => {
  const { data: session } = useSession();

  const { data: dduduDetail } = useQuery<DDuDuDetailType>({
    queryKey: [FEED_KEY.DDUDU_DETAIL, dduduId],
    queryFn: () => getDDuDuDetail({ accessToken: session?.sessionToken as string, id: dduduId }),
    enabled: !!session?.sessionToken && dduduId > -1,
  });

  if (!dduduDetail) {
    return;
  }

  return (
    <div className="w-ful flex flex-col items-center gap-[2.5rem] p-[2rem]">
      <DDuDuMainMenu
        type={type}
        dduduId={dduduId}
        dduduDetail={dduduDetail}
        handleEditDDuDu={handleEditDDuDu}
        onDeleteDDuDu={onDeleteDDuDu}
        handleDDuDuTimeSetting={handleDDuDuTimeSetting}
        handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
      />
      <DDuDuSubMenu
        dduduDetail={dduduDetail}
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
        onRepeatCurrentDate={onRepeatCurrentDate}
      />
    </div>
  );
};

export default DDuDuMenu;
