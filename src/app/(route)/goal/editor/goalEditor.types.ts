import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";

export interface GoalEditorFormInfo {
  goal: string;
}

export interface GoalFormDataType {
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDdudusType[];
}
