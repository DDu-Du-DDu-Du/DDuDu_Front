"use client";

import { Fragment, useCallback, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button, ColorSheet, PrivacySheet, SelectUiDiv, TextInput } from "@/app/_components/client";
import { ArrowRightIcon, GoalTodoListItem } from "@/app/_components/server";
import {
  fetchCreateGoal,
  fetchDeleteGoal,
  fetchEditGoal,
  fetchStatusChangeGoal,
} from "@/app/_services/client/goalEditor";
import useGoalFormStore from "@/app/_store/useGoalFormStore/useGoalFormStore";
import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";
import { useMutation } from "@tanstack/react-query";

import { DAY_OF_WEEK_STRING } from "../../../../[id]/repeat/components/DDuDuRepeatForm/DDuDuRepeatForm.constants";
import { PRIVACY_TYPE } from "./GoalEditorForm.constants";
import { useColorToggle, useGoalPrivacyToggle } from "./hooks";

import { debounce } from "lodash";
import { useSession } from "next-auth/react";
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
  // id가 있는 경우는 수정 페이지임, id가 없는 경우는 생성 페이지임
  // id가 있다면 useQuery를 통해 데이터를 불러온 후 초깃값을 props로 전달
  // id가 없으면 생성이기 때문에 default 값으로 수정
  const router = useRouter();
  const { goalText, goalPrivacy, color, repeatDDuDu } = goalFormData;
  const { setIsEditing, setGoalText, setGoalPrivacy, setColor, reset } = useGoalFormStore();

  const methods = useForm<GoalEditorFormInfo>({
    defaultValues: {
      goal: goalText,
    },
  });

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!isLoadTempData) {
      return;
    }

    methods.setValue("goal", goalText);
  }, []);

  const { data: session } = useSession();

  const deleteGoalMutation = useMutation({
    mutationKey: ["goal", "delete", goalId],
    mutationFn: fetchDeleteGoal,
  });

  const statusChangeGoalMutation = useMutation({
    mutationKey: ["goal", "status", goalId],
    mutationFn: fetchStatusChangeGoal,
  });

  const createGoalMutation = useMutation({
    mutationKey: ["goal", "create"],
    mutationFn: fetchCreateGoal,
  });

  const editGoalMutation = useMutation({
    mutationKey: ["goal", "edit", goalId],
    mutationFn: fetchEditGoal,
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
      createGoalMutation.mutate({ accessToken: session?.sessionToken as string, goalData });
    }

    reset();
    router.push("/feed");
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
    router.replace("/goal");
  };

  const handleGoalDelete = () => {
    deleteGoalMutation.mutate({ accessToken: session?.sessionToken as string, goalId });
    router.replace("/goal");
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
            <ul className="flex flex-col max-h-[19rem] gap-[0.8rem] mt-[1rem] overflow-y-scroll">
              {repeatDDuDu?.map(({ id, name, repeatPattern, startDate, endDate }) => (
                <Fragment key={id}>
                  <GoalTodoListItem
                    id={id}
                    title={name}
                    repeatDays={
                      (repeatPattern.type === "WEEKLY"
                        ? repeatPattern.repeatDaysOfWeek
                            ?.map((weekDay) => DAY_OF_WEEK_STRING[weekDay])
                            .join(" ")
                        : repeatPattern.repeatDaysOfMonth?.join(" ")) || "매일"
                    }
                    startDate={startDate}
                    endDate={endDate}
                    goalId={goalId}
                  />
                </Fragment>
              ))}
            </ul>
          </li>

          {goalId && (
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
