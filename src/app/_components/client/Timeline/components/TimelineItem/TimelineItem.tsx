import { Fragment } from "react";

import {
  useDDuDuCreate,
  useDDuDuDate,
  useDDuDuDateMutation,
  useDDuDuEdit,
  useDDuDuMutation,
  useDDuDuTime,
  useDDuDuTimeMutation,
} from "@/app/(route)/feed/components/MainGoalItem/hooks";
import { AlarmSheet, DDuDuSheet, DDuDuTimeSheet } from "@/app/_components/client";
import { BottomSingleCalendar } from "@/app/_components/client/Calendar";
import { useToggle } from "@/app/_hooks";
import { MainTimeTableDDuDuType } from "@/app/_types/response/feed/feed";

import { TimeItem, TimeStamp } from "./components";

import { useSession } from "next-auth/react";

interface TimelineItemProps {
  baseTime: string;
  dduduList: MainTimeTableDDuDuType[];
  selectedDDuDuDate: string;
}

const TimelineItem = ({ baseTime, dduduList, selectedDDuDuDate }: TimelineItemProps) => {
  const { data: session } = useSession();
  const {
    isToggle: isDDuDuSheetToggle,
    handleToggleOn: handleDDuDUSheetToggleOn,
    handleToggleOff: handleDDuDuSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isCalendarSheetToggle,
    handleToggleOn: handleCalendarSheetToggleOn,
    handleToggleOff: handleCalendarSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isAlarmSheetToggle,
    handleToggleOn: handleAlarmSheetToggleOn,
    handleToggleOff: handleAlarmSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isDDuDUTimeSheetToggle,
    handleToggleOn: handleDDuDuTimeSheetToggleOn,
    handleToggleOff: handleDDuDuTimeSheetToggleOff,
  } = useToggle();

  const { setIsCreateDDuDu } = useDDuDuCreate();
  const { currentDDuDuId, setCurrentDDuDuId, handleUpdateEditDDuDuId } = useDDuDuEdit({
    setIsCreateDDuDu,
  });

  const {
    selectedDate,
    currentDate,
    currentCalendarType,
    handleSelectedDate,
    handleSelectDifferentDate,
  } = useDDuDuDate({ handleCalendarSheetToggleOn, handleDDuDuSheetToggleOff });

  const { onDDuDuCompleteToggle, onDeleteDDuDu } = useDDuDuMutation({
    sessionToken: session?.sessionToken as string,
    selectedDDuDuDate: selectedDDuDuDate,
    handleDDuDuSheetToggleOff,
  });

  const { currentDDuDuTime, handleDDuDuTimeSetting, handleUpdateDDuDuTime } = useDDuDuTime({
    handleDDuDuTimeSheetToggleOn,
    handleDDuDuSheetToggleOff,
  });

  const { onChangeDDuDuDate, onRepeatCurrentDate } = useDDuDuDateMutation({
    sessionToken: session?.sessionToken as string,
    currentDDuDuId,
    currentCalendarType,
    handleSelectedDate,
    handleCalendarSheetToggleOff,
    handleDDuDuSheetToggleOff,
  });

  const { onChangeDDuDuTime } = useDDuDuTimeMutation({
    sessionToken: session?.sessionToken as string,
    currentDDuDuTime,
    currentDDuDuId,
    selectedDDuDuDate,
    handleUpdateDDuDuTime,
    handleDDuDuTimeSheetToggleOff,
  });

  const handleDDuDuSheetOpen = (id: number) => {
    setCurrentDDuDuId(id);
    handleDDuDUSheetToggleOn();
  };

  const handleAlarmSetting = () => {
    handleAlarmSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  return (
    <li className="flex w-full">
      <TimeStamp>{baseTime}</TimeStamp>

      <div className="w-[5rem]" />

      <ul className="flex flex-1 flex-col gap-[1rem] pr-[1rem]">
        {dduduList.map((ddudu, index) => (
          <Fragment key={`${ddudu.id}${index}`}>
            <TimeItem
              ddudu={ddudu}
              isLastItem={dduduList.length - 1 === index}
              onDDuDuCompleteToggle={onDDuDuCompleteToggle}
              handleDDuDuSheetOpen={handleDDuDuSheetOpen}
            />
            {isDDuDuSheetToggle && (
              <DDuDuSheet
                type="schedule"
                dduduId={ddudu.id}
                handleEditDDuDu={handleUpdateEditDDuDuId}
                onDeleteDDuDu={onDeleteDDuDu}
                handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
                handleSelectDifferentDate={handleSelectDifferentDate}
                handleAlarmSetting={handleAlarmSetting}
                handleDDuDuTimeSetting={handleDDuDuTimeSetting}
                onRepeatCurrentDate={onRepeatCurrentDate}
              />
            )}
            {isAlarmSheetToggle && (
              <AlarmSheet handleAlarmSheetToggleOff={handleAlarmSheetToggleOff} />
            )}
            {isCalendarSheetToggle && (
              <BottomSingleCalendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                setSelected={handleSelectedDate}
                onChangeDDuDuDate={onChangeDDuDuDate}
                handleCalendarSheetToggleOff={handleCalendarSheetToggleOff}
              />
            )}
            {isDDuDUTimeSheetToggle && (
              <DDuDuTimeSheet
                currentDDuDuTime={currentDDuDuTime}
                onChangeDDuDuTime={onChangeDDuDuTime}
                handleDDuDuTimeSheetToggleOff={handleDDuDuTimeSheetToggleOff}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </li>
  );
};

export default TimelineItem;
