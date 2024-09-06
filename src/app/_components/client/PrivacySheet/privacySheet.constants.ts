import { PrivacyItemType } from "./privacySheet.types";

export const PRIVACY_LIST: PrivacyItemType[] = [
  {
    id: "public",
    label: "전체공개",
    name: "privacyType",
    value: "PUBLIC",
  },
  {
    id: "follower",
    label: "팔로워 공개",
    name: "privacyType",
    value: "FOLLOWER",
  },
  {
    id: "private",
    label: "나만보기",
    name: "privacyType",
    value: "PRIVATE",
  },
];
