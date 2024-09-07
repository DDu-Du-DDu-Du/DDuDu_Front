import { useState } from "react";

import { DDuDuTimeType } from "@/app/(route)/feed/feed.types";

interface UseDDuDuTimeProps {
  handleDDuDuTimeSheetToggleOn: () => void;
  handleDDuDuSheetToggleOff: () => void;
}

const useDDuDuTime = ({
  handleDDuDuTimeSheetToggleOn,
  handleDDuDuSheetToggleOff,
}: UseDDuDuTimeProps) => {
  const [currentDDuDuTime, setCurrentDDuDuTime] = useState<DDuDuTimeType>({
    beginAt: "",
    endAt: "",
  });

  const handleDDuDuTimeSetting = (beginAt: string = "", endAt: string = "") => {
    setCurrentDDuDuTime({ beginAt, endAt });
    handleDDuDuTimeSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  const handleUpdateDDuDuTime = (updateTime: DDuDuTimeType) => {
    setCurrentDDuDuTime(updateTime);
  };

  return { currentDDuDuTime, handleDDuDuTimeSetting, handleUpdateDDuDuTime };
};

export default useDDuDuTime;
