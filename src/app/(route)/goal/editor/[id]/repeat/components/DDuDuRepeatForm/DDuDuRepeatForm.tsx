"use client";

import { Fragment } from "react";
import { FormProvider } from "react-hook-form";

import { CheckboxInput, InputDate, InputRadio, TextInput } from "@/app/_components/client";
import InputTime from "@/app/_components/client/InputTime/InputTime";
import { useGoalFormStore } from "@/app/_store";
import { DayOfWeek, RepeatDdudusDateType, RepeatDdudusType } from "@/app/_types/response/goal/goal";

import {
  DATE_RADIO_LIST,
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  DAY_OF_WEEK_STRING,
} from "./DDuDuRepeatForm.constants";
import { DayOfMonthString } from "./DDuDuRepeatForm.types";
import {
  useDeleteRepeatDDuDuMutation,
  useRepeatDDuDuEditor,
  useRepeatDDuDuMutation,
} from "./hooks";

export interface DDuDuRepeatFormDataType {
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
  const { repeatDDuDu, setIsLoad, setRepeatDDuDu, setAddRepeatDDuDu } = useGoalFormStore();

  const {
    methods,
    errors,
    selectedDateValue,
    selectedDayOfWeekItems,
    selectedDayOfMonthItems,
    selectedLastDay,
  } = useRepeatDDuDuEditor({ currentRepeatDDuDu, currentRepeatMonthData, setIsLoad });

  const { onValid } = useRepeatDDuDuMutation({
    goalId,
    repeatId,
    repeatDDuDu,
    setRepeatDDuDu,
    setAddRepeatDDuDu,
  });

  const { handleRepeatDDuDuDelete } = useDeleteRepeatDDuDuMutation({
    goalId,
    repeatId,
    repeatDDuDu,
    setRepeatDDuDu,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-dvh pt-[8.5rem] px-[2rem]"
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
              <button
                className="w-full h-[4rem] text-size13 font-medium bg-example_gray_100 rounded-radius10 text-red_500"
                onClick={handleRepeatDDuDuDelete}
              >
                반복 삭제하기
              </button>
            </li>
          )}
        </ul>
        <button
          className="w-full h-[5.6rem] mb-[3rem] text-size15 font-medium bg-main text-white rounded-radius15"
          type="submit"
        >
          {repeatId ? "반복 수정" : "반복 생성"}
        </button>
      </form>
    </FormProvider>
  );
};

export default DDuDuRepeatForm;
