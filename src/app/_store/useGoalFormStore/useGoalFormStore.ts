import { RepeatType } from "@/app/(route)/goal/editor/[id]/repeat/components/DDuDuRepeatForm/DDuDuRepeatForm.types";
import { GoalPrivacyType } from "@/app/(route)/goal/editor/components/GoalEditor/components/GoalEditorForm/GoalEditorForm.types";

import { create } from "zustand";

export interface UseGoalFormStoreState {
  type: "CREATE" | "EDIT";
  isLoad: boolean;
  isEditing: boolean;
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDDuDuItem[];
  setIsLoad: (isLoad: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setGoalText: (goalText: string) => void;
  setGoalPrivacy: (goalPrivacy: GoalPrivacyType) => void;
  setColor: (color: string) => void;
  setRepeatDDuDu: (repeatDDuDu: RepeatDDuDuItem[]) => void;
  setAddRepeatDDuDu: (repeatDDuDu: RepeatDDuDuItem) => void;
  initialize: ({ type, goalText, goalPrivacy, color, repeatDDuDu }: UseGoalFormStoreProps) => void;
  reset: () => void;
}

export interface RepeatDDuDuItem {
  repeatId: number;
  goalId: number;
  name: string;
  repeatType: RepeatType;
  repeatDaysOfWeek?: DayOfWeek[];
  repeatDatesOfMonth?: DayOfMonth[];
  startDate: string;
  endDate: string;
  time: string;
}

export interface UseGoalFormStoreProps {
  type?: "CREATE" | "EDIT";
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDDuDuItem[];
}

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";
export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

const useGoalFormStore = create<UseGoalFormStoreState>((set) => ({
  type: "CREATE",
  isLoad: false,
  isEditing: false,
  goalText: "",
  goalPrivacy: "PUBLIC",
  color: "#7f8c8d",
  repeatDDuDu: [],
  setIsLoad: (isLoad) => set({ isLoad }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setGoalText: (goalText) => set({ goalText }),
  setGoalPrivacy: (goalPrivacy) => set({ goalPrivacy }),
  setColor: (color) => set({ color }),
  setRepeatDDuDu: (repeatDDuDu) => set({ repeatDDuDu }),
  setAddRepeatDDuDu: (repeatDDuDu) =>
    set((state) => ({ repeatDDuDu: [...state.repeatDDuDu, repeatDDuDu] })),
  initialize: ({ type, goalText, goalPrivacy, color, repeatDDuDu }) =>
    set({ type, goalText, goalPrivacy, color, repeatDDuDu }),
  reset: () =>
    set({
      type: "CREATE",
      isLoad: false,
      isEditing: false,
      goalText: "",
      goalPrivacy: "PUBLIC",
      color: "#7f8c8d",
      repeatDDuDu: [],
    }),
}));

export default useGoalFormStore;
