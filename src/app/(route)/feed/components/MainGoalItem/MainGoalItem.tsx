"use client";

import { Fragment } from "react";

import { AlarmSheet, DDuDuSheet, DDuDuTimeSheet } from "@/app/_components/client";
import { BottomSingleCalendar } from "@/app/_components/client/Calendar";
import { GoalItem } from "@/app/_components/server";
import { useToggle } from "@/app/_hooks";
import { MainDailyListType } from "@/app/_types/response/feed/feed";

import { MainDDuDuInput, MainDDuDuItem } from "./components";
import {
  useDDuDuCreate,
  useDDuDuDate,
  useDDuDuDateMutation,
  useDDuDuEdit,
  useDDuDuMutation,
  useDDuDuTime,
  useDDuDuTimeMutation,
} from "./hooks";

import { useSession } from "next-auth/react";

interface MainGoalItemProps extends MainDailyListType {
  selectedDDuDuDate: string;
}

const MainGoalItem = ({ goal, ddudus, selectedDDuDuDate }: MainGoalItemProps) => {
  const {
    isToggle: isDDuDuSheetToggle,
    handleToggleOn: handleDDuDUSheetToggleOn,
    handleToggleOff: handleDDuDuSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isAlarmSheetToggle,
    handleToggleOn: handleAlarmSheetToggleOn,
    handleToggleOff: handleAlarmSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isCalendarSheetToggle,
    handleToggleOn: handleCalendarSheetToggleOn,
    handleToggleOff: handleCalendarSheetToggleOff,
  } = useToggle();

  const {
    isToggle: isDDuDUTimeSheetToggle,
    handleToggleOn: handleDDuDuTimeSheetToggleOn,
    handleToggleOff: handleDDuDuTimeSheetToggleOff,
  } = useToggle();

  const { isCreateDDuDu, setIsCreateDDuDu, handleOpenDDuDuInput } = useDDuDuCreate();
  const {
    currentDDuDuId,
    editDDuDuId,
    setCurrentDDuDuId,
    handleCloseDDuDuInput,
    handleUpdateEditDDuDuId,
  } = useDDuDuEdit({ setIsCreateDDuDu });

  const {
    selectedDate,
    currentDate,
    currentCalendarType,
    handleSelectedDate,
    handleSelectDifferentDate,
  } = useDDuDuDate({ handleCalendarSheetToggleOn, handleDDuDuSheetToggleOff });

  const { currentDDuDuTime, handleDDuDuTimeSetting, handleUpdateDDuDuTime } = useDDuDuTime({
    handleDDuDuTimeSheetToggleOn,
    handleDDuDuSheetToggleOff,
  });

  const { data: session } = useSession();

  const { onDDuDuCompleteToggle, onDeleteDDuDu } = useDDuDuMutation({
    sessionToken: session?.sessionToken as string,
    selectedDDuDuDate,
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
    <li className="mb-[2.5rem]">
      <GoalItem
        type="create"
        id={goal.id}
        goalName={goal.name}
        onOpenDDuDuInput={handleOpenDDuDuInput}
      />
      <ul className="flex flex-col gap-[1rem]">
        {ddudus.map(({ id, name, status }) => (
          <Fragment key={id}>
            {id === editDDuDuId ? (
              <MainDDuDuInput
                type="edit"
                goalId={goal.id}
                color={goal.color}
                dduduItem={{ id, name, status }}
                selectedDDuDuDate={selectedDDuDuDate}
                onCloseDDuDuInput={handleCloseDDuDuInput}
              />
            ) : (
              <MainDDuDuItem
                id={id}
                ddudu={name}
                status={status}
                color={goal.color}
                onDDuDuCompleteToggle={onDDuDuCompleteToggle}
                handleToggleOn={() => handleDDuDuSheetOpen(id)}
              />
            )}
          </Fragment>
        ))}
        {isCreateDDuDu && (
          <MainDDuDuInput
            goalId={goal.id}
            color={goal.color}
            selectedDDuDuDate={selectedDDuDuDate}
            onCloseDDuDuInput={handleCloseDDuDuInput}
          />
        )}
      </ul>

      {isDDuDuSheetToggle && (
        <DDuDuSheet
          dduduId={currentDDuDuId}
          handleEditDDuDu={handleUpdateEditDDuDuId}
          onDeleteDDuDu={onDeleteDDuDu}
          handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
          handleSelectDifferentDate={handleSelectDifferentDate}
          handleAlarmSetting={handleAlarmSetting}
          handleDDuDuTimeSetting={handleDDuDuTimeSetting}
          onRepeatCurrentDate={onRepeatCurrentDate}
        />
      )}
      {isAlarmSheetToggle && <AlarmSheet handleAlarmSheetToggleOff={handleAlarmSheetToggleOff} />}
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
    </li>
  );
};

export default MainGoalItem;
