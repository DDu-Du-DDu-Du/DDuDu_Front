"use client";

import { FormProvider } from "react-hook-form";

import { Button, ColorSheet, PrivacySheet, SelectUiDiv, TextInput } from "@/app/_components/client";
import { ArrowRightIcon } from "@/app/_components/server";
import useGoalFormStore from "@/app/_store/useGoalFormStore/useGoalFormStore";
import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";

import DDuDuRepeatList from "../DDuDuRepeatList/DDuDuRepeatList";
import { PRIVACY_TYPE } from "./GoalEditorForm.constants";
import {
  useColorToggle,
  useDeleteGoalMutation,
  useGoalEditor,
  useGoalPrivacyToggle,
  useStatusChangeGoalMutation,
  useUpdateGoalMutation,
} from "./hooks";

import { useSession } from "next-auth/react";
import Link from "next/link";

export interface GoalEditorFormInfo {
  goal: string;
}

interface GoalFormDataType {
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDdudusType[];
}

interface GoalEditorFormProps {
  goalId: string;
  goalStatus?: "IN_PROGRESS" | "DONE";
  goalFormData: GoalFormDataType;
  isLoadTempData: boolean | null;
}

const GoalEditorForm = ({
  goalId,
  goalStatus,
  goalFormData,
  isLoadTempData,
}: GoalEditorFormProps) => {
  const { goalText, goalPrivacy, color, repeatDDuDu } = goalFormData;

  const { setIsEditing, setGoalText, setGoalPrivacy, setColor, reset } = useGoalFormStore();

  const {
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOff,
    handleGoalPrivacyToggleOn,
    handleSelectGoalPrivacy,
  } = useGoalPrivacyToggle({ goalId, setGoalPrivacy, setIsEditing });

  const { isColorToggle, handleColorToggleOff, handleColorToggleOn, handleSelectColor } =
    useColorToggle({ goalId, setColor, setIsEditing });

  const { methods, handleMoveRepeatDDuDu } = useGoalEditor({
    goalId,
    goalText,
    isLoadTempData,
    setGoalText,
    setIsEditing,
  });

  const { data: session } = useSession();

  const { handleGoalDelete } = useDeleteGoalMutation({
    sessionToken: session?.sessionToken as string,
    goalId,
    reset,
  });

  const { handleGoalStatusChange } = useStatusChangeGoalMutation({
    sessionToken: session?.sessionToken as string,
    goalId,
    goalStatus,
    reset,
  });

  const { onValid } = useUpdateGoalMutation({
    sessionToken: session?.sessionToken as string,
    goalId,
    color,
    goalPrivacy,
    repeatDDuDu,
    reset,
  });

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
              options={{ required: true }}
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
              goalPrivacy={goalPrivacy}
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
          {!goalId && (
            <li>
              <div className="flex justify-between items-center">
                <strong className="pl-[1.8rem] font-medium text-size13">반복 뚜두 만들기</strong>
                <div
                  className="px-[1.4rem] py-[1rem] cursor-pointer"
                  onClick={handleMoveRepeatDDuDu}
                >
                  <ArrowRightIcon
                    size={16}
                    fill="none"
                    stroke="#D9D9D9"
                  />
                </div>
              </div>
              <DDuDuRepeatList
                repeatDDuDu={repeatDDuDu}
                goalId={goalId}
              />
            </li>
          )}

          {goalId && (
            <>
              <li>
                <div className="flex justify-between items-center">
                  <strong className="pl-[1.8rem] font-medium text-size13">반복</strong>
                  <Link
                    className="px-[1.4rem] py-[1rem] cursor-pointer"
                    href={`/goal/editor/${goalId}/repeats`}
                    title="반복 뚜두 관리 페이지 이동"
                  >
                    <ArrowRightIcon
                      size={16}
                      fill="none"
                      stroke="#D9D9D9"
                    />
                  </Link>
                </div>
              </li>
              <li className="flex gap-[1rem]">
                <Button
                  className="w-full h-[4rem] text-size13 font-medium bg-example_gray_100 rounded-radius10"
                  onClick={handleGoalStatusChange}
                >
                  {goalStatus === "IN_PROGRESS" ? "목표 종료하기" : "목표 재개하기"}
                </Button>
                <Button
                  className="w-full h-[4rem] text-size13 font-medium bg-example_gray_100 rounded-radius10"
                  onClick={handleGoalDelete}
                >
                  목표 삭제하기
                </Button>
              </li>
            </>
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

export default GoalEditorForm;
