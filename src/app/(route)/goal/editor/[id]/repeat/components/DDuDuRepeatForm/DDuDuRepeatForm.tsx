"use client";

import { Fragment, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, CheckboxInput, InputDate, InputRadio, TextInput } from "@/app/_components/client";
import InputTime from "@/app/_components/client/InputTime/InputTime";
import { fetchCreateRepeatDDudu, fetchEditRepeatDDudu } from "@/app/_services/client/repeatDdudu";
import { useGoalFormStore } from "@/app/_store";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";
import {
  DayOfMonth,
  DayOfWeek,
  RepeatDdudusDateType,
  RepeatDdudusPattern,
  RepeatDdudusType,
} from "@/app/_types/response/goal/goal";
import { useMutation } from "@tanstack/react-query";

import {
  DATE_RADIO_LIST,
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  DAY_OF_WEEK_STRING,
} from "./DDuDuRepeatForm.constants";
import { DayOfMonthString } from "./DDuDuRepeatForm.types";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DDuDuRepeatFormDataType {
  name: string;
  repeatType: RepeatDdudusDateType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDaysOfMonth?: DayOfMonthString[];
  lastDay: string[];
  startDate: string;
  endDate: string;
  beginAt: string;
  endAt: string;
}

interface DDuDuRepeatFormProps {
  goalId: string;
  repeatId: string;
  currentRepeatDDuDu?: RepeatDdudusType;
  currentRepeatMonthData: DayOfMonthString[];
}

const DDuDuRepeatForm = ({
  goalId,
  repeatId,
  currentRepeatDDuDu,
  currentRepeatMonthData,
}: DDuDuRepeatFormProps) => {
  const methods = useForm<DDuDuRepeatFormDataType>({
    defaultValues: {
      name: currentRepeatDDuDu?.name,
      repeatType: currentRepeatDDuDu?.repeatPattern.repeatType,
      repeatDaysOfWeek: currentRepeatDDuDu?.repeatPattern.repeatDaysOfWeek || [],
      repeatDaysOfMonth: currentRepeatMonthData,
      lastDay: currentRepeatDDuDu?.repeatPattern.lastDay ? ["lastDay"] : [],
      startDate: currentRepeatDDuDu?.startDate,
      endDate: currentRepeatDDuDu?.endDate,
      beginAt: currentRepeatDDuDu?.beginAt,
      endAt: currentRepeatDDuDu?.endAt,
    },
  });
  const { errors } = methods.formState;

  const { repeatDDuDu, setIsLoad, setRepeatDDuDu, setAddRepeatDDuDu } = useGoalFormStore();
  const router = useRouter();

  const selectedDateValue = methods.watch("repeatType");
  const selectedDayOfWeekItems = methods.watch("repeatDaysOfWeek");
  const selectedDayOfMonthItems = methods.watch("repeatDaysOfMonth");
  const selectedLastDay = methods.watch("lastDay");

  useEffect(() => {
    setIsLoad(true);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const { data: session } = useSession();

  const createRepeatDDuDuMutation = useMutation({
    mutationKey: ["repeat", "ddudu"],
    mutationFn: fetchCreateRepeatDDudu,
    onSuccess: () => {
      router.replace(`/goal/editor/${goalId}/repeats`);
    },
  });

  const editRepeatDDuDuMutation = useMutation({
    mutationKey: ["repeat", "ddudu", repeatId],
    mutationFn: fetchEditRepeatDDudu,
    onSuccess: () => {
      router.replace(`/goal/editor/${goalId}/repeats`);
    },
  });

  const onValid: SubmitHandler<DDuDuRepeatFormDataType> = ({
    name,
    repeatType,
    repeatDaysOfMonth,
    repeatDaysOfWeek,
    startDate,
    endDate,
    lastDay,
    beginAt,
    endAt,
  }) => {
    let repeatPattern: RepeatDdudusPattern = { repeatType };
    let repeatTime = {};

    if (repeatType === "WEEKLY") {
      repeatPattern = { repeatType, repeatDaysOfWeek };
    } else if (repeatType === "MONTHLY") {
      const daysOfMonth: DayOfMonth[] = repeatDaysOfMonth
        ? repeatDaysOfMonth.map(Number).filter((day): day is DayOfMonth => day >= 1 && day <= 31)
        : [];

      if (daysOfMonth.length === 0 && !!lastDay[0] === false) {
        // 매월을 선택하고 일자 / 마지막 날을 아무 것도 선택하지 않은 경우
        return;
      }

      repeatPattern = {
        repeatType,
        repeatDaysOfMonth: daysOfMonth,
        lastDay: !!lastDay[0],
      };
    }

    if (beginAt && endAt) {
      repeatTime = { beginAt, endAt };
    }

    const newRepeatDDuDuId =
      repeatDDuDu.length === 0 ? 1 : repeatDDuDu[repeatDDuDu.length - 1].id + 1;

    const newRepeatDDuDu: RepeatDdudusType = {
      name,
      id: newRepeatDDuDuId,
      startDate,
      endDate,
      repeatPattern,
      ...repeatTime,
    };

    const requestRepeatDDuDu: RepeatDduduRequestType = {
      name,
      startDate,
      endDate,
      ...repeatPattern,
      ...repeatTime,
    };

    if (repeatId) {
      const editRepeatDDuDu = repeatDDuDu.map((ddudu) => {
        if (ddudu.id === Number(repeatId)) {
          return { ...newRepeatDDuDu, id: ddudu.id };
        }

        return ddudu;
      });

      setRepeatDDuDu(editRepeatDDuDu);

      if (Number(goalId)) {
        // 즉시 수정
        editRepeatDDuDuMutation.mutate({
          accessToken: session?.sessionToken as string,
          repeatDDuDuData: requestRepeatDDuDu,
          repeatId,
        });
      }
    } else {
      setAddRepeatDDuDu(newRepeatDDuDu);

      if (Number(goalId)) {
        // 즉시 생성
        createRepeatDDuDuMutation.mutate({
          accessToken: session?.sessionToken as string,
          repeatDDuDuData: { ...requestRepeatDDuDu, goalId: Number(goalId) },
        });
      }
    }

    if (!Number(goalId)) {
      router.back();
    }
  };

  const handleRepeatDDuDuDelete = () => {
    if (goalId === "create") {
      const updateRepeatDDuDu = repeatDDuDu.filter((ddudu) => ddudu.id !== Number(repeatId));
      setRepeatDDuDu(updateRepeatDDuDu);
      router.replace("/goal/editor");
    } else {
      // repeatDDuDu DELETE API호출
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-dvh pt-[6rem] px-[2rem]"
        onSubmit={methods.handleSubmit(onValid)}
      >
        <ul className="flex flex-col flex-1 gap-[2.4rem]">
          <li>
            <TextInput
              name="name"
              placeholder="뚜두입력"
              options={{ required: true }}
            />
          </li>
          <li className="flex gap-[0.8rem]">
            {DATE_RADIO_LIST.map(({ id, name, label }) => (
              <Fragment key={id}>
                <InputRadio
                  id={id}
                  name={name}
                  label={label}
                  selected={selectedDateValue}
                />
              </Fragment>
            ))}
          </li>

          {selectedDateValue === "WEEKLY" && (
            <li className="-mt-[1.6rem]">
              <ul className="flex gap-[0.5rem]">
                {DAY_OF_WEEK.map((day, index) => (
                  <li key={index}>
                    <CheckboxInput
                      type="word"
                      name="repeatDaysOfWeek"
                      value={day}
                      checked={selectedDayOfWeekItems?.includes(day) ? true : false}
                      options={{ required: true }}
                    >
                      {DAY_OF_WEEK_STRING[day]}
                    </CheckboxInput>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {selectedDateValue === "MONTHLY" && (
            <li className="-mt-[1.6rem]">
              <ul className="grid grid-cols-7 gap-[0.5rem] max-w-fit">
                {DAY_OF_MONTH.map((day, index) => (
                  <li key={index}>
                    <CheckboxInput
                      type="word"
                      name="repeatDaysOfMonth"
                      value={day}
                      checked={selectedDayOfMonthItems?.includes(day) ? true : false}
                    >
                      {day}
                    </CheckboxInput>
                  </li>
                ))}
                <li className="col-span-2 pr-0">
                  <CheckboxInput
                    className="w-auth"
                    type="word"
                    name="lastDay"
                    value="lastDay"
                    checked={selectedLastDay?.includes("lastDay") ? true : false}
                  >
                    마지막 날
                  </CheckboxInput>
                </li>
              </ul>
            </li>
          )}

          <li>
            <InputDate
              type="range"
              mode={repeatId ? "edit" : "create"}
              labelStart={currentRepeatDDuDu?.startDate ?? "시작날짜"}
              nameStart="startDate"
              labelEnd={currentRepeatDDuDu?.endDate ?? "종료날짜"}
              nameEnd="endDate"
            />
          </li>
          <li>
            <InputTime
              type="range"
              beginAt={currentRepeatDDuDu?.beginAt ?? ""}
              nameStart="beginAt"
              labelStart={currentRepeatDDuDu?.beginAt ?? "시작시간"}
              nameEnd="endAt"
              labelEnd={currentRepeatDDuDu?.endAt ?? "종료시간"}
            />
            {errors.endAt && (
              <p className="mt-[0.5rem] text-example_red_500">{errors.endAt.message}</p>
            )}
          </li>
          {repeatId && (
            <li>
              <Button
                className="w-full h-[4rem] text-size13 font-medium bg-example_gray_100 rounded-radius10"
                onClick={handleRepeatDDuDuDelete}
              >
                반복 삭제하기
              </Button>
            </li>
          )}
        </ul>
        <Button
          className="w-full h-[5.6rem] mb-[3rem] text-size15 font-medium bg-example_gray_700 rounded-radius15"
          type="submit"
        >
          {repeatId ? "반복 수정" : "반복 생성"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default DDuDuRepeatForm;
