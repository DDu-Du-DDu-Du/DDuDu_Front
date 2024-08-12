import { GoalPrivacyType } from "../../response/goal/goal";

export interface GoalRequestType {
  name: string;
  color: string;
  privacyType: GoalPrivacyType;
}
