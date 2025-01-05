import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

export interface PrivacyItemType {
  id: "public" | "follower" | "private";
  icon?: React.ReactNode;
  label: "전체공개" | "팔로워 공개" | "나만보기";
  name: "privacyType";
  value: GoalPrivacyType;
}
