import { GoalPrivacyType } from "../../response/goal/goal";
import { RepeatDduduRequestType } from "../repeatDdudu/repeatDdudu";

export interface GoalRequestType {
  name: string;
  color: string;
  privacyType: GoalPrivacyType;
  repeatDdudus?: RepeatDduduRequestType[];
}
