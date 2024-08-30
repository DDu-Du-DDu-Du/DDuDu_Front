"use client";

import { Fragment, useState } from "react";

import { AlarmSheet, DDuDuSheet } from "@/app/_components/client";
import { BottomSingleCalender } from "@/app/_components/client/Calender";
import { GoalItem } from "@/app/_components/server";
import { useToggle } from "@/app/_hooks";
import { fetchCompleteToggleDDuDu, fetchDeleteDDuDu } from "@/app/_services/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MainDailyListType } from "../../feed.types";
import { MainDDuDuInput, MainDDuDuItem } from "./components";

import { useSession } from "next-auth/react";

interface MainGoalItemProps extends MainDailyListType {
  selectedDDuDu: string;
}

const MainGoalItem = ({ goal, ddudus, selectedDDuDu }: MainGoalItemProps) => {
  const [isCreateDDuDu, setIsCreateDDuDu] = useState(false);
  const [currentDDuDuId, setCurrentDDuDuId] = useState(-1);
  const [isDDuDuEdit, setIsDDuDuEdit] = useState(-1);

  const [selectedDate, setSelectedDate] = useState<Date>();

  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();

  const { isToggle: isAlarmSheetToggle, handleToggleOn: handleAlarmSheetToggleOn } = useToggle();

  const {
    isToggle: isCalendarSheetToggle,
    handleToggleOn: handleCalendarSheetToggleOn,
    handleToggleOff: handleCalendarSheetToggleOff,
  } = useToggle();

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const deleteDDuDuMutation = useMutation({
    mutationKey: ["deleteDDuDu"],
    mutationFn: fetchDeleteDDuDu,
    onSuccess: (status) => {
      if (status === 204) {
        queryClient.refetchQueries({ queryKey: ["monthlyDDuDus"] });
        queryClient.refetchQueries({ queryKey: ["dailyList", selectedDDuDu] });
        handleToggleOff();
      }
    },
  });

  const completeToggleDDuDuMutation = useMutation({
    mutationKey: ["completeToggle"],
    mutationFn: fetchCompleteToggleDDuDu,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["monthlyDDuDus"] });
      queryClient.refetchQueries({ queryKey: ["dailyList", selectedDDuDu] });
    },
  });

  const onOpenDDuDuInput = () => {
    setIsCreateDDuDu(true);
  };

  const onCloseDDuDuInput = () => {
    setIsCreateDDuDu(false);
    setIsDDuDuEdit(-1);
    setCurrentDDuDuId(-1);
  };

  const onEditDDuDu = () => {
    onCloseDDuDuInput();
  };

  const onDDuDuCheckToggle = (id: number) => {
    completeToggleDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });
  };

  const handleDDuDuSheetOpen = (id: number) => {
    setCurrentDDuDuId(id);
    handleToggleOn();
  };

  const handleEditDDuDuId = (id: number) => {
    setIsDDuDuEdit(id);
  };

  const handleDeleteDDuDuId = (id: number) => {
    deleteDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });
  };

  const handleSelectDifferentDate = () => {
    handleCalendarSheetToggleOn();
    handleToggleOff();
  };

  const handleAlarmSetting = () => {
    handleAlarmSheetToggleOn();
    handleToggleOff();
  };

  const handleSelectedDate = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
  };

  return (
    <li className="mb-[2.5rem]">
      <GoalItem
        type="create"
        id={goal.id}
        goalName={goal.name}
        onOpenDDuDuInput={onOpenDDuDuInput}
      />
      <ul className="flex flex-col gap-[1rem]">
        {ddudus.map(({ id, name, status }) => (
          <Fragment key={id}>
            {id === isDDuDuEdit ? (
              <MainDDuDuInput
                type="edit"
                goalId={goal.id}
                color={goal.color}
                dduduItem={{ id, name, status }}
                selectedDDuDu={selectedDDuDu}
                onEditDDuDu={onEditDDuDu}
                onCloseDDuDuInput={onCloseDDuDuInput}
              />
            ) : (
              <MainDDuDuItem
                id={id}
                ddudu={name}
                status={status}
                color={goal.color}
                onDDuDuCheckToggle={onDDuDuCheckToggle}
                handleToggleOn={() => handleDDuDuSheetOpen(id)}
              />
            )}
          </Fragment>
        ))}
        {isCreateDDuDu && (
          <MainDDuDuInput
            goalId={goal.id}
            color={goal.color}
            selectedDDuDu={selectedDDuDu}
            onCloseDDuDuInput={onCloseDDuDuInput}
          />
        )}
      </ul>
      {isToggle && (
        <DDuDuSheet
          dduduId={currentDDuDuId}
          handleEditDDuDuId={handleEditDDuDuId}
          handleDeleteDDuDuId={handleDeleteDDuDuId}
          onClose={handleToggleOff}
          handleSelectDifferentDate={handleSelectDifferentDate}
          handleAlarmSetting={handleAlarmSetting}
        />
      )}
      {isAlarmSheetToggle && <AlarmSheet />}
      {isCalendarSheetToggle && (
        <BottomSingleCalender
          selected={selectedDate}
          setSelected={handleSelectedDate}
          handleCalendarSheetToggleOff={handleCalendarSheetToggleOff}
        />
      )}
    </li>
  );
};

export default MainGoalItem;
