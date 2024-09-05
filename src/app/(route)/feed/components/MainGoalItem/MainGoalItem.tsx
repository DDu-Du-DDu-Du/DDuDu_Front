"use client";

import { Fragment, useState } from "react";

import { AlarmSheet, DDuDuSheet, DDuDuTimeSheet } from "@/app/_components/client";
import { BottomSingleCalender } from "@/app/_components/client/Calender";
import { GoalItem } from "@/app/_components/server";
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

import { DDuDuTimeRangeType, DDuDuTimeType } from "../../feed.types";
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

  const [currentDate, setCurrentDate] = useState("");
  const [currentDDuDuTime, setCurrentDDuDUTime] = useState<DDuDuTimeType>({
    beginAt: "",
    endAt: "",
  });
  const [currentCalendarType, setCurrentCalendarType] = useState<"repeat" | "change">("change");

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

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const deleteDDuDuMutation = useMutation({
    mutationKey: ["deleteDDuDu"],
    mutationFn: fetchDeleteDDuDu,
    onSuccess: (status) => {
      if (status === 204) {
        queryClient.refetchQueries({ queryKey: ["monthlyDDuDus"] });
        queryClient.refetchQueries({ queryKey: ["dailyList", selectedDDuDu] });
        handleDDuDuSheetToggleOff();
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

  const dduduChangeDateMutation = useMutation({
    mutationKey: ["dduduChangeDate"],
    mutationFn: fetchDDuDuChangeDate,
    onSuccess: (status) => {
      if (status === 204) {
        queryClient.invalidateQueries({
          queryKey: ["dailyList"],
        });
        queryClient.refetchQueries({
          queryKey: ["dailyList"],
        });
        queryClient.refetchQueries({ queryKey: ["monthlyDDuDus"] });

        setSelectedDate(undefined);
        handleCalendarSheetToggleOff();
      }
    },
  });

  const dduduRepeatDateMutation = useMutation({
    mutationKey: ["dduduRepeatDate"],
    mutationFn: fetchDDuDuRepeatDate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dailyList"],
      });
      queryClient.refetchQueries({
        queryKey: ["dailyList"],
      });
      queryClient.refetchQueries({ queryKey: ["monthlyDDuDus"] });

      setSelectedDate(undefined);
      handleDDuDuSheetToggleOff();
      handleCalendarSheetToggleOff();
    },
  });

  const dduduChangeTimeMutation = useMutation({
    mutationKey: ["dduduChangeTime"],
    mutationFn: fetchDDuDuChangeTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dduduDetail"] });
      queryClient.refetchQueries({ queryKey: ["dduduDetail"] });
      setCurrentDDuDUTime({ beginAt: "", endAt: "" });
      handleDDuDuTimeSheetToggleOff();
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
    handleDDuDUSheetToggleOn();
  };

  const handleEditDDuDu = (id: number) => {
    setIsDDuDuEdit(id);
  };

  const handleDeleteDDuDu = (id: number) => {
    deleteDDuDuMutation.mutate({
      accessToken: session?.sessionToken as string,
      id,
    });
  };

  const handleSelectDifferentDate = (type: "change" | "repeat", currentDate: string) => {
    setCurrentCalendarType(type);
    setCurrentDate(currentDate);
    handleCalendarSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  const handleAlarmSetting = () => {
    handleAlarmSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  const handleDDuDuTimeSetting = (beginAt: string = "", endAt: string = "") => {
    setCurrentDDuDUTime({ beginAt, endAt });
    handleDDuDuTimeSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  const handleSelectedDate = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
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

  const onChangeDDuDUTime = (selectedTime: DDuDuTimeRangeType) => {
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

  const handleRepeatCurrentDate = () => {
    dduduRepeatDateMutation.mutate({
      accessToken: session?.sessionToken as string,
      id: currentDDuDuId,
      date: formatDateToYYYYMMDD(new Date()),
    });
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

      {isDDuDuSheetToggle && (
        <DDuDuSheet
          dduduId={currentDDuDuId}
          handleEditDDuDu={handleEditDDuDu}
          handleDeleteDDuDu={handleDeleteDDuDu}
          handleDDuDuSheetToggleOff={handleDDuDuSheetToggleOff}
          handleSelectDifferentDate={handleSelectDifferentDate}
          handleAlarmSetting={handleAlarmSetting}
          handleDDuDuTimeSetting={handleDDuDuTimeSetting}
          handleRepeatCurrentDate={handleRepeatCurrentDate}
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
          onChangeDDuDUTime={onChangeDDuDUTime}
          handleDDuDuTimeSheetToggleOff={handleDDuDuTimeSheetToggleOff}
        />
      )}
    </li>
  );
};

export default MainGoalItem;
