"use client";

import { Fragment, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, CheckboxInput, InputDate, InputRadio, TextInput } from "@/app/_components/client";
import InputTime from "@/app/_components/client/InputTime/InputTime";
import { useGoalFormStore } from "@/app/_store";
import {
  DayOfMonth,
  DayOfWeek,
  RepeatDdudusDateType,
  RepeatDdudusType,
} from "@/app/_types/response/goal/goal";

import {
  DATE_RADIO_LIST,
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  DAY_OF_WEEK_STRING,
} from "./DDuDuRepeatForm.constants";
import { DayOfMonthString } from "./DDuDuRepeatForm.types";

import { useRouter } from "next/navigation";

interface DDuDuRepeatFormDataType {
  name: string;
  repeatType: RepeatDdudusDateType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDaysOfMonth?: DayOfMonthString[];
  lastDay: string[];
  startDate: string;
  endDate: string;
  time: string;
}

interface DDuDuRepeatFormProps {
  repeatId: string;
  currentRepeatDDuDu?: RepeatDdudusType;
  currentRepeatMonthData: DayOfMonthString[];
}

const DDuDuRepeatForm = ({
  repeatId,
  currentRepeatDDuDu,
  currentRepeatMonthData,
}: DDuDuRepeatFormProps) => {
  const methods = useForm<DDuDuRepeatFormDataType>({
    defaultValues: {
      name: currentRepeatDDuDu?.name,
      repeatType: currentRepeatDDuDu?.repeatPattern.type,
      repeatDaysOfWeek: currentRepeatDDuDu?.repeatPattern.repeatDaysOfWeek || [],
      repeatDaysOfMonth: currentRepeatMonthData,
      lastDay: currentRepeatDDuDu?.repeatPattern.lastDay ? ["lastDay"] : [],
      startDate: currentRepeatDDuDu?.startDate,
      endDate: currentRepeatDDuDu?.endDate,
      time: currentRepeatDDuDu?.beginAt,
    },
  });
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

  const onValid: SubmitHandler<DDuDuRepeatFormDataType> = (data) => {
    console.log("data", data);
    if (repeatId) {
      const editRepeatDDuDu = repeatDDuDu.filter((ddudu) => String(ddudu.id) !== repeatId);

      editRepeatDDuDu.push({
        id: Number(repeatId),
        name: data.name,
        repeatPattern: {
          type: data.repeatType,
          repeatDaysOfWeek: data.repeatDaysOfWeek,
          repeatDaysOfMonth: data.repeatDaysOfMonth?.map(Number) as DayOfMonth[],
          lastDay: data.lastDay[0] ? true : false,
        },
        startDate: data.startDate,
        endDate: data.endDate,
        beginAt: data.time,
      });
      setRepeatDDuDu(editRepeatDDuDu);
    } else {
      const newRepeatDDuDu = {
        id: Number(repeatId),
        name: data.name,
        repeatPattern: {
          type: data.repeatType,
          repeatDaysOfWeek: data.repeatDaysOfWeek,
          repeatDaysOfMonth: data.repeatDaysOfMonth?.map(Number) as DayOfMonth[],
          lastDay: data.lastDay[0] ? true : false,
        },
        startDate: data.startDate,
        endDate: data.endDate,
        beginAt: data.time,
      };
      setAddRepeatDDuDu(newRepeatDDuDu);
    }

    router.back();
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
              id="time"
              name="time"
              label={currentRepeatDDuDu?.beginAt ?? "시간추가"}
            />
          </li>
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
