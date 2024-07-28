"use client";

import { Fragment, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, CheckboxInput, InputDate, InputRadio, TextInput } from "@/app/_components/client";
import InputTime from "@/app/_components/client/InputTime/InputTime";
import { useGoalFormStore } from "@/app/_store";
import {
  DayOfMonth,
  DayOfWeek,
  RepeatDDuDuItem,
} from "@/app/_store/useGoalFormStore/useGoalFormStore";

import { DATE_RADIO_LIST, DAY_OF_MONTH, DAY_OF_WEEK } from "./DDuDuRepeatForm.constants";
import { RepeatType } from "./DDuDuRepeatForm.types";

import { useRouter } from "next/navigation";

interface DDuDuRepeatFormDataType {
  name: string;
  repeatType: RepeatType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDatesOfMonth?: DayOfMonth[];
  startDate: string;
  endDate: string;
  time: string;
}

interface DDuDuRepeatFormProps {
  goalId: string;
  repeatId: string;
  currentRepeatDDuDu?: RepeatDDuDuItem;
}

const DDuDuRepeatForm = ({ repeatId, currentRepeatDDuDu }: DDuDuRepeatFormProps) => {
  const methods = useForm<DDuDuRepeatFormDataType>({
    defaultValues: {
      name: currentRepeatDDuDu?.name,
      repeatType: currentRepeatDDuDu?.repeatType,
      repeatDaysOfWeek: currentRepeatDDuDu?.repeatDaysOfWeek,
      repeatDatesOfMonth: currentRepeatDDuDu?.repeatDatesOfMonth,
      startDate: currentRepeatDDuDu?.startDate,
      endDate: currentRepeatDDuDu?.endDate,
      time: currentRepeatDDuDu?.time,
    },
  });
  const { repeatDDuDu, setIsLoad, setRepeatDDuDu, setAddRepeatDDuDu } = useGoalFormStore();
  const router = useRouter();

  const selectedDateValue = methods.watch("repeatType");

  useEffect(() => {
    setIsLoad(true);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const onValid: SubmitHandler<DDuDuRepeatFormDataType> = (data) => {
    if (repeatId) {
      const editRepeatDDuDu = repeatDDuDu.filter((ddudu) => String(ddudu.goalId) !== repeatId);
      editRepeatDDuDu.push({
        ...data,
        repeatId: Number(repeatId),
        goalId: Number(repeatId),
      });
      setRepeatDDuDu(editRepeatDDuDu);
    } else {
      const tempId = Math.floor(Math.random() * 10000);
      const newRepeatDDuDu = {
        ...data,
        repeatId: tempId,
        goalId: tempId,
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
                    >
                      {day}
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
                      name="repeatDatesOfMonth"
                      value={day}
                    >
                      {day}
                    </CheckboxInput>
                  </li>
                ))}
              </ul>
            </li>
          )}

          <li>
            <InputDate
              type="range"
              labelStart={currentRepeatDDuDu?.startDate ?? "시작날짜"}
              nameStart="startDate"
              labelEnd={currentRepeatDDuDu?.endDate ?? "종료날짜"}
              nameEnd="endDate"
            />
          </li>
          <li>
            <InputTime
              id="1"
              name="time"
              label={currentRepeatDDuDu?.time ?? "시간추가"}
              handleTimeChange={(time) => console.log(time)}
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
