"use client";

import { useCallback, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, ColorSheet, PrivacySheet, SelectUiDiv, TextInput } from "@/app/_components/client";
import { ArrowRightIcon } from "@/app/_components/server";
import {
  fetchCreateGoal,
  fetchDeleteGoal,
  fetchEditGoal,
  fetchStatusChangeGoal,
} from "@/app/_services/client/goalEditor";
import useGoalFormStore from "@/app/_store/useGoalFormStore/useGoalFormStore";
import { RepeatDduduRequestType } from "@/app/_types/request/repeatDdudu/repeatDdudu";
import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DDuDuRepeatList from "../DDuDuRepeatList/DDuDuRepeatList";
import { PRIVACY_TYPE } from "./GoalEditorForm.constants";
import { useColorToggle, useGoalPrivacyToggle } from "./hooks";

import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GoalEditorFormInfo {
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
  const router = useRouter();
  const { goalText, goalPrivacy, color, repeatDDuDu } = goalFormData;
  const { setIsEditing, setGoalText, setGoalPrivacy, setColor, reset } = useGoalFormStore();

  const methods = useForm<GoalEditorFormInfo>();

  const {
    isGoalPrivacyToggle,
    handleGoalPrivacyToggleOff,
    handleGoalPrivacyToggleOn,
    handleSelectGoalPrivacy,
  } = useGoalPrivacyToggle({ onSelectPrivacy: setGoalPrivacy, onSetIsEditing: setIsEditing });

  const { isColorToggle, handleColorToggleOff, handleColorToggleOn, handleSelectColor } =
    useColorToggle({ onSelectColor: setColor, onSetIsEditing: setIsEditing });

  const goalValue = methods.watch("goal");

  /* eslint-disable react-hooks/exhaustive-deps */
  const delayedGoalValueSave = useCallback(
    debounce((goalValue) => {
      setGoalText(goalValue);
      setIsEditing(true);
    }, 2000),
    [],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!goalValue || goalText === goalValue) {
      return;
    }

    delayedGoalValueSave(goalValue);
  }, [goalValue]);

  useEffect(() => {
    if (!isLoadTempData) {
      return;
    }

    methods.setValue("goal", goalText);
  }, [isLoadTempData]);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    reset();
    router.replace("/goal");
  };

  const deleteGoalMutation = useMutation({
    mutationKey: ["goal", "delete", goalId],
    mutationFn: fetchDeleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goalList"] });
      handleSuccess();
    },
  });

  const statusChangeGoalMutation = useMutation({
    mutationKey: ["goal", "status", goalId],
    mutationFn: fetchStatusChangeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleSuccess();
    },
  });

  const createGoalMutation = useMutation({
    mutationKey: ["goal", "create"],
    mutationFn: fetchCreateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goalList"] });
      handleSuccess();
    },
  });

  const editGoalMutation = useMutation({
    mutationKey: ["goal", "edit", goalId],
    mutationFn: fetchEditGoal,
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleSuccess();
    },
  });

  const onValid: SubmitHandler<GoalEditorFormInfo> = ({ goal }) => {
    const goalData = {
      name: goal,
      color: color.slice(1),
      privacyType: goalPrivacy,
    };

    if (goalId) {
      editGoalMutation.mutate({ accessToken: session?.sessionToken as string, goalData, goalId });
    } else {
      const goalRepeatData = repeatDDuDu.map((ddudu) => {
        const repeatDDuDu: RepeatDduduRequestType = {
          name: ddudu.name,
          startDate: ddudu.startDate,
          endDate: ddudu.endDate,
          repeatType: ddudu.repeatPattern.repeatType,
        };

        if (ddudu.repeatPattern.repeatType === "WEEKLY") {
          repeatDDuDu.repeatDaysOfWeek = ddudu.repeatPattern.repeatDaysOfWeek;
        } else if (ddudu.repeatPattern.repeatType === "MONTHLY") {
          repeatDDuDu.repeatDaysOfMonth = ddudu.repeatPattern.repeatDaysOfMonth;
          repeatDDuDu.lastDayOfMonth = ddudu.repeatPattern.lastDay;
        }

        return repeatDDuDu;
      });

      createGoalMutation.mutate({
        accessToken: session?.sessionToken as string,
        goalData: { ...goalData, repeatDdudus: [...goalRepeatData] },
      });
    }
  };

  const handleMoveRepeatDDuDu = () => {
    if (goalId) {
      router.push(`/goal/editor/${goalId}/repeat`);
      return;
    }

    router.push("/goal/editor/create/repeat");
  };

  const handleGoalStatusChange = () => {
    statusChangeGoalMutation.mutate({
      accessToken: session?.sessionToken as string,
      goalId,
      status: goalStatus === "IN_PROGRESS" ? "DONE" : "IN_PROGRESS",
    });
  };

  const handleGoalDelete = () => {
    deleteGoalMutation.mutate({ accessToken: session?.sessionToken as string, goalId });
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
