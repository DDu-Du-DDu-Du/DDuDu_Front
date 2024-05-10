"use client";

import { UserType } from "@/app/_types/response/user";

import profileImage from "../../../../../public/assets/userProfile.svg";
import { AVATAR_SIZE } from "./Avatar.constant";
import { AvatarEdit, AvatarList } from "./components";
import { useChangeImage, useClickAvatar } from "./hooks";

import Image from "next/image";
import { twJoin } from "tailwind-merge";

export type AvatarProps = {
  type?: "view" | "edit";
  size?: "small" | "medium" | "large";
  onChangeAvatar?: (file: File | null) => void;
} & ({ user: UserType; users?: UserType[] } | { users: UserType[]; user?: UserType });

const Avatar = ({ type = "view", size = "small", user, users, onChangeAvatar }: AvatarProps) => {
  const { userId = "", userName = "", userImage = null } = user ?? users?.[0] ?? {};
  const { preview, inputRef, handleChangeImage } = useChangeImage({ userImage, onChangeAvatar });
  const { handleClickAvatar } = useClickAvatar({ type, inputRef, userId, onChangeAvatar });

  if (users && users.length > 1) {
    return <AvatarList users={users} />;
  }

  if (users && users.length === 0) {
    return <></>;
  }

  return (
    <div
      className={twJoin(
        "relative",
        AVATAR_SIZE[size],
        (userId || type === "edit") && "cursor-pointer",
      )}
      onClick={handleClickAvatar}
    >
      <div className="size-[100%] overflow-hidden rounded-circle bg-white_100 shadow-shadow_500">
        <Image
          className="rounded-circle object-cover"
          src={preview || profileImage}
          alt={`${userName}님의 프로필 이미지`}
          sizes="100%"
          fill
          priority
        />
      </div>

      {type === "edit" && (
        <AvatarEdit
          size={size}
          inputRef={inputRef}
          handleChangeImage={handleChangeImage}
        />
      )}
    </div>
  );
};

export default Avatar;
