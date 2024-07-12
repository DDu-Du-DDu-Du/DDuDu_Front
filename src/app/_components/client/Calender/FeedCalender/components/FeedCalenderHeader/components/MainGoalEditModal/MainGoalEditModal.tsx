"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Modal } from "@/app/_components/client";

import { MonthlyGoalsType } from "../../../../FeedCalender";

export interface AlertModalProps {
  isToggle: boolean;
  monthlyGoal?: MonthlyGoalsType[];
  handleToggleOff: () => void;
}

interface GoalListInputType {
  goalEdit1?: string;
  goalEdit2?: string;
  goalEdit3?: string;
  goalEdit4?: string;
  goalEdit5?: string;
}

const MainGoalEditModal = ({ isToggle, monthlyGoal, handleToggleOff }: AlertModalProps) => {
  const { handleSubmit, reset } = useForm<GoalListInputType>();

  const handleUpdateGoal: SubmitHandler<GoalListInputType> = (data) => {
    // 수정 API 호출 필요
    console.log(data);

    handleToggleOff();
  };

  const handleResetGoal = () => {
    reset();

    handleToggleOff();
  };

  return (
    <Modal isToggle={isToggle}>
      <h3 className="mb-[2rem] pt-[2.4rem] text-size15 font-medium">목표 수정하기</h3>
      <form onSubmit={handleSubmit(handleUpdateGoal)}>
        <ul>
          {monthlyGoal?.map(({ id, contents }) => (
            <li key={id}>
              <input
                type="text"
                defaultValue={contents}
              />
            </li>
          ))}
        </ul>
        {monthlyGoal && monthlyGoal.length < 5 && <button type="button">목표 추가하기</button>}
        <div className="flex px-[0.9rem] gap-[0.9rem]">
          <button
            type="submit"
            className="mx-auto mb-[0.9rem] block h-[5.2rem] w-[94%] rounded-[1rem] bg-[#D9D9D9] text-size15 font-medium"
          >
            수정
          </button>
          <button
            type="button"
            className="mx-auto mb-[0.9rem] block h-[5.2rem] w-[94%] rounded-[1rem] bg-[#D9D9D9] text-size15 font-medium"
            onClick={handleResetGoal}
          >
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MainGoalEditModal;
