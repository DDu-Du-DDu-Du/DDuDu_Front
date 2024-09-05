"use client";

import { Fragment } from "react";

import { AlarmSheet, DDuDuSheet, DDuDuTimeSheet } from "@/app/_components/client";
import { BottomSingleCalender } from "@/app/_components/client/Calender";
import { GoalItem } from "@/app/_components/server";
import { FEED_KEY } from "@/app/_constants/queryKey/queryKey";
import { useToggle } from "@/app/_hooks";
import {
  fetchCompleteToggleDDuDu,
  fetchDDuDuChangeDate,
  fetchDDuDuChangeTime,
  fetchDDuDuRepeatDate,
  fetchDeleteDDuDu,
} from "@/app/_services/client";
import { MainDailyListType } from "@/app/_types/response/feed/feed";
import { formatDateToYYYYMMDD } from "@/app/_utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DDuDuTimeRangeType } from "../../feed.types";
import { MainDDuDuInput, MainDDuDuItem } from "./components";
import { useDDuDuCreate, useDDuDuDate, useDDuDuEdit, useDDuDuTime } from "./hooks";

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

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const deleteDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.DELETE_DDUDU],
    mutationFn: fetchDeleteDDuDu,
    onSuccess: (status) => {
      if (status === 204) {
        queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
        queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate] });
        handleDDuDuSheetToggleOff();
      }
    },
  });

  const completeToggleDDuDuMutation = useMutation({
    mutationKey: [FEED_KEY.COMPLETE_TOGGLE],
    mutationFn: fetchCompleteToggleDDuDu,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.DAILY_LIST, selectedDDuDuDate] });
    },
  });

  const dduduChangeDateMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_CHANGE_DATE],
    mutationFn: fetchDDuDuChangeDate,
    onSuccess: (status) => {
      if (status === 204) {
        queryClient.invalidateQueries({
          queryKey: [FEED_KEY.DAILY_LIST],
        });
        queryClient.refetchQueries({
          queryKey: [FEED_KEY.DAILY_LIST],
        });
        queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });

        handleSelectedDate(undefined);
        handleCalendarSheetToggleOff();
      }
    },
  });

  const dduduRepeatDateMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_REPEAT_DATE],
    mutationFn: fetchDDuDuRepeatDate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FEED_KEY.DAILY_LIST],
      });
      queryClient.refetchQueries({
        queryKey: [FEED_KEY.DAILY_LIST],
      });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.MONTHLY_DDUDUS] });

      handleSelectedDate(undefined);
      handleDDuDuSheetToggleOff();
      handleCalendarSheetToggleOff();
    },
  });

  const dduduChangeTimeMutation = useMutation({
    mutationKey: [FEED_KEY.DDUDU_CHANGE_TIME],
    mutationFn: fetchDDuDuChangeTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEY.DDUDU_DETAIL] });
      queryClient.refetchQueries({ queryKey: [FEED_KEY.DDUDU_DETAIL] });
      handleUpdateDDuDuTime({ beginAt: "", endAt: "" });
      handleDDuDuTimeSheetToggleOff();
    },
  });

  const onDDuDuCheckToggle = (id: number) => {
    completeToggleDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });
  };

  const handleDDuDuSheetOpen = (id: number) => {
    setCurrentDDuDuId(id);
    handleDDuDUSheetToggleOn();
  };

  const handleDeleteDDuDu = (id: number) => {
    deleteDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });
  };

  const handleAlarmSetting = () => {
    handleAlarmSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  const onChangeDDuDuDate = (selectedDate: Date) => {
    if (currentCalendarType === "change") {
      dduduChangeDateMutation.mutate({
        accessToken: session?.sessionToken as string,
        id: currentDDuDuId,
        date: formatDateToYYYYMMDD(selectedDate),
      });
    } else if (currentCalendarType === "repeat") {
      dduduRepeatDateMutation.mutate({
        accessToken: session?.sessionToken as string,
        id: currentDDuDuId,
        date: formatDateToYYYYMMDD(selectedDate),
      });
    }
  };

  const onRepeatCurrentDate = () => {
    dduduRepeatDateMutation.mutate({
      accessToken: session?.sessionToken as string,
      id: currentDDuDuId,
      date: formatDateToYYYYMMDD(new Date()),
    });
  };

  const onChangeDDuDuTime = (selectedTime: DDuDuTimeRangeType) => {
    const { beginHour, beginMin, endHour, endMin } = selectedTime;
    const time = {
      beginAt: `${beginHour < 10 ? `0${beginHour}` : beginHour}:${beginMin < 10 ? `0${beginMin}` : beginMin}:00`,
      endAt: `${endHour < 10 ? `0${endHour}` : endHour}:${endMin < 10 ? `0${endMin}` : endMin}:00`,
    };

    if (!currentDDuDuTime.beginAt || !currentDDuDuTime.endAt) {
      // 처음 시간 설정하는 것이기 때문에 즉시 API 호출
      if (beginHour === 0 && beginMin === 0 && endHour === 0 && endMin === 0) {
        handleDDuDuTimeSheetToggleOff();
        return;
      }
    } else {
      const [currentBeginHour, currentBeginMin] = currentDDuDuTime.beginAt.split(":").map(Number);
      const [currentEndHour, currentEndMin] = currentDDuDuTime.endAt.split(":").map(Number);

      if (
        beginHour === currentBeginHour &&
        beginMin === currentBeginMin &&
        endHour === currentEndHour &&
        endMin === currentEndMin
      ) {
        handleDDuDuTimeSheetToggleOff();
        return;
      }
    }

    dduduChangeTimeMutation.mutate({
      accessToken: session?.sessionToken as string,
      time,
      id: currentDDuDuId,
    });
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
            selectedDDuDuDate={selectedDDuDuDate}
            onCloseDDuDuInput={handleCloseDDuDuInput}
          />
        )}
      </ul>

      {isDDuDuSheetToggle && (
        <DDuDuSheet
          dduduId={currentDDuDuId}
          handleEditDDuDu={handleUpdateEditDDuDuId}
          handleDeleteDDuDu={handleDeleteDDuDu}
          handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
          handleSelectDifferentDate={handleSelectDifferentDate}
          handleAlarmSetting={handleAlarmSetting}
          handleDDuDuTimeSetting={handleDDuDuTimeSetting}
          onRepeatCurrentDate={onRepeatCurrentDate}
        />
      )}
      {isAlarmSheetToggle && <AlarmSheet handleAlarmSheetToggleOff={handleAlarmSheetToggleOff} />}
      {isCalendarSheetToggle && (
        <BottomSingleCalender
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
