import { getDDuDuDetail } from "@/app/_services/client";
import formatDateToYYYYMMDD from "@/app/_utils/formatDateToYYYYMMDD/formatDateToYYYYMMDD";
import { useQuery } from "@tanstack/react-query";

import { DDuDuMainMenu, DDuDuSubMenu } from "./components";

import { useSession } from "next-auth/react";

interface DDuDuDetailType {
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
  handleSelectDifferentDate: () => void;
  handleAlarmSetting: () => void;
}

export const DDuDuMenu = ({
  dduduId,
  handleEditDDuDu,
  handleDeleteDDuDu,
  onClose,
  handleSelectDifferentDate,
  handleAlarmSetting,
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

  const { scheduledOn, status } = dduduDetail;

  const isDDuDuDateNow = formatDateToYYYYMMDD(new Date()) === scheduledOn;

  return (
    <div className="w-ful flex flex-col items-center gap-[2.5rem] p-[2rem]">
      <DDuDuMainMenu
        dduduId={dduduId}
        isDDuDuDateNow={isDDuDuDateNow}
        status={status}
        handleEditDDuDu={handleEditDDuDu}
        handleDeleteDDuDu={handleDeleteDDuDu}
        onClose={onClose}
      />
      <DDuDuSubMenu
        isDDuDuDateNow={isDDuDuDateNow}
        status={status}
        handleSelectDifferentDate={handleSelectDifferentDate}
        handleAlarmSetting={handleAlarmSetting}
      />
    </div>
  );
};

export default DDuDuMenu;
