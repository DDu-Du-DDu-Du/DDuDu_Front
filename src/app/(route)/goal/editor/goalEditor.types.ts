import { RepeatDDuDuItem } from "@/app/_store/useGoalFormStore/useGoalFormStore";

import { GoalPrivacyType } from "./components/GoalEditor/components/GoalEditorForm/GoalEditorForm.types";

export interface GoalDataType {
  id: number;
  name: string;
  status: "IN_PROGRESS" | "DONE";
  color: string;
  privacyType: GoalPrivacyType;
}

export interface GoalType {
  id: number;
  name: string;
  status: "IN_PROGRESS" | "DONE";
  color: string;
  privacyType: GoalPrivacyType;
  repeatDDuDu: RepeatDDuDuItem[];
}
