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
  dduduId: number;
  handleEditDDuDu: (id: number) => void;
  handleDeleteDDuDu: (id: number) => void;
  onClose: () => void;
  handleSelectDifferentDate: (type: "change" | "repeat", currentDate: string) => void;
  handleAlarmSetting: () => void;
  handleDDuDuTimeSetting: (beginAt?: string, endAt?: string) => void;
  handleRepeatCurrentDate: () => void;
}

export const DDuDuMenu = ({
  dduduId,
  handleEditDDuDu,
  handleDeleteDDuDu,
  onClose,
  handleSelectDifferentDate,
  handleAlarmSetting,
  handleDDuDuTimeSetting,
  handleRepeatCurrentDate,
}: DDuDuMenuProps) => {
  const { data: session } = useSession();

  const { data: dduduDetail } = useQuery<DDuDuDetailType>({
    queryKey: ["dduduDetail", dduduId],
    queryFn: () => getDDuDuDetail({ accessToken: session?.sessionToken as string, id: dduduId }),
    enabled: !!session?.sessionToken && dduduId > -1,
  });

  if (!dduduDetail) {
    return;
  }

  return (
    <div className="w-ful flex flex-col items-center gap-[2.5rem] p-[2rem]">
      <DDuDuMainMenu
        dduduId={dduduId}
        dduduDetail={dduduDetail}
        handleEditDDuDu={handleEditDDuDu}
        handleDeleteDDuDu={handleDeleteDDuDu}
        handleDDuDuTimeSetting={handleDDuDuTimeSetting}
        onClose={onClose}
      />
      <DDuDuSubMenu
        dduduDetail={dduduDetail}
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
        handleRepeatCurrentDate={handleRepeatCurrentDate}
      />
    </div>
  );
};

export default DDuDuMenu;
