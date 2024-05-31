"use client";

import { Fragment } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, ColorSheet, PrivacySheet, SelectUiDiv, TextInput } from "@/app/_components/client";
import { ArrowRightIcon, GoalTodoListItem } from "@/app/_components/server";

import { DDUDU_REPEAT_LIST, PRIVACY_TYPE } from "./GoalEditor.constants";
import { useColorToggle, useGoalPrivacyToggle } from "./hooks";

interface GoalEditorInfo {
  goal: string;
}

interface GoalEditorProps {
  goalId: string;
}

const GoalEditor = ({ goalId }: GoalEditorProps) => {
  const methods = useForm<GoalEditorInfo>();
  const {
    goalPrivacy,
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOff,
    handleGoalPrivacyToggleOn,
    handleSelectGoalPrivacy,
  } = useGoalPrivacyToggle({ defaultGoalPrivacy: "PUBLIC" });
  const { color, isColorToggle, handleColorToggleOff, handleColorToggleOn, handleSelectColor } =
    useColorToggle({ defaultColor: "#7f8c8d" });

  const onValid: SubmitHandler<GoalEditorInfo> = (data) => {
    console.log(data);
    console.log(goalPrivacy);
    console.log(color);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-dvh pt-[6rem] px-[2rem]"
        onSubmit={methods.handleSubmit(onValid)}
      >
        <ul className="flex flex-col flex-1 gap-[2rem]">
          <li className="mb-[0.4rem]">
            <TextInput
              name="goal"
              placeholder="목표입력"
            />
          </li>
          <li className="flex justify-between items-center">
            <strong className="pl-[1.8rem] font-medium text-size13">공개설정</strong>
            <SelectUiDiv
              onClick={handleGoalPrivacyToggleOn}
              width="10.5rem"
            >
              {PRIVACY_TYPE[goalPrivacy]}
            </SelectUiDiv>
            <PrivacySheet
              isShow={isGoalPrivacyToggle}
              onClose={handleGoalPrivacyToggleOff}
              onClick={handleSelectGoalPrivacy}
            />
          </li>
          <li className="flex justify-between items-center">
            <strong className="pl-[1.8rem] font-medium text-size13">색상</strong>
            <SelectUiDiv
              backgroundColor="transparent"
              onClick={handleColorToggleOn}
            >
              <div
                className="w-[2.1rem] h-[2.1rem] rounded-circle"
                style={{ backgroundColor: color }}
              />
            </SelectUiDiv>
            <ColorSheet
              isShow={isColorToggle}
              onClose={handleColorToggleOff}
              onClick={handleSelectColor}
              pickedColor={color}
            />
          </li>
          <li>
            <div className="flex justify-between items-center">
              <strong className="pl-[1.8rem] font-medium text-size13">반복 뚜두 만들기</strong>
              <div className="px-[1.4rem] py-[1rem] cursor-pointer">
                <ArrowRightIcon
                  size={16}
                  fill="none"
                  stroke="#D9D9D9"
                />
              </div>
            </div>
            <ul className="flex flex-col max-h-[19rem] gap-[0.8rem] mt-[1rem] overflow-y-scroll">
              {DDUDU_REPEAT_LIST.map(({ id, title, repeatDays, startDate, endDate }) => (
                <Fragment key={id}>
                  <GoalTodoListItem
                    title={title}
                    repeatDays={repeatDays}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </Fragment>
              ))}
            </ul>
          </li>

          {goalId && (
            <li>
              <Button className="w-full h-[4rem] text-size13 font-medium bg-example_gray_100 rounded-radius10">
                목표 종료하기
              </Button>
            </li>
          )}
        </ul>
        <Button
          className="w-full h-[5.6rem] mb-[3rem] text-size15 font-medium bg-example_gray_700 rounded-radius15"
          type="submit"
        >
          {goalId ? "목표 수정" : "목표 등록"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default GoalEditor;
