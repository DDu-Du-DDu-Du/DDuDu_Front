"use client";

import { useMemo } from "react";

import { UserType } from "@/app/_types/response/user";

import { Avatar } from "../../client";
import getTimeDiffInKorean from "./utils/getTimeDiffInKorean/getTimeDiffInKorean";

interface FollowRequestItemProps {
  user: UserType;
  followRequestAt: string;
  onFollowRequestCheck: (isFollow: boolean) => void;
}

const FollowRequestItem = ({
  user,
  followRequestAt,
  onFollowRequestCheck,
}: FollowRequestItemProps) => {
  const timeAge = useMemo(() => getTimeDiffInKorean(followRequestAt), [followRequestAt]);

  const handleIncompleteClick = () => {
    console.log("거절");
    onFollowRequestCheck(false);
  };

  const handleCompleteClick = () => {
    console.log("수락");
    onFollowRequestCheck(true);
  };

  return (
    <li className="list-none">
      <div className="flex items-center mb-[1.6rem]">
        <Avatar user={user} />
        <div className="flex-1 ml-[0.8rem]">
          <span className="block text-size13 leading-[1.3rem]">
            <b className="font-semiBold">{user.userName}님</b>이 팔로우를 요청했습니다.
          </span>
          <small className="text-size11 leading-[1.1rem]">{timeAge}</small>
        </div>
      </div>
      <div className="flex justify-between gap-[1rem]">
        <button
          className="flex-1 h-[3rem] text-size11 bg-example_gray_100 rounded-radius5 hover:bg-example_gray_300 transition-colors duration-200 ease-in-out"
          onClick={handleIncompleteClick}
        >
          거절
        </button>
        <button
          className="flex-1 h-[3rem] text-size11 bg-example_gray_700 rounded-radius5 hover:bg-example_gray_900 transition-colors duration-200 ease-in-out"
          onClick={handleCompleteClick}
        >
          수락
        </button>
      </div>
    </li>
  );
};

export default FollowRequestItem;
