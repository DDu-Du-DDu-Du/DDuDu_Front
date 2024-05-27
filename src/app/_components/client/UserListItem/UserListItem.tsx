"use client";

import { useToggle } from "@/app/_hooks";
import { UserType } from "@/app/_types/response/user";

import Avatar from "../Avatar/Avatar";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useToggleFollow } from "./hooks";

import { twJoin } from "tailwind-merge";

interface UserListItemProps {
  type: "following" | "follow";
  user: UserType;
  isFollowing: boolean;
  isPrivate: boolean;
}

const UserListItem = ({ type, user, isFollowing, isPrivate }: UserListItemProps) => {
  const { isToggle, handleToggleOff, handleToggleOn } = useToggle();
  const { isFollow, isPrivateFollow, handleToggleFollow, handleFollowCheck } = useToggleFollow({
    isFollowing,
    isPrivate,
    handleToggleOn,
  });

  return (
    <li className="flex justify-between items-center ">
      <div className="flex items-center flex-1">
        <Avatar user={user} />
        <span className="flex-1 mx-[1.6rem] text-size13 font-regular">{user.userName}</span>
      </div>
      <button
        className={twJoin(
          "w-[8rem] h-[3rem] rounded-radius10 text-size11 font-regular",
          type === "follow" && isFollow && "border-solid border-[0.1rem] border-example_gray_700",
          type === "following" && isFollow && "bg-example_gray_100",
          !isFollow && "bg-example_gray_700",
        )}
        onClick={handleToggleFollow}
      >
        {isPrivateFollow ? (isFollow ? "요청중" : "팔로우") : isFollow ? "팔로잉" : "팔로우"}
      </button>
      <ConfirmModal
        isToggle={isToggle}
        title="팔로잉 요청중 입니다."
        message="정말 취소하시겠습니까?"
        handleToggleOff={handleToggleOff}
        onCompleteCheck={handleFollowCheck}
      />
    </li>
  );
};

export default UserListItem;
