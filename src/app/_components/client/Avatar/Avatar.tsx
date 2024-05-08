"use client";

import profileImage from "../../../../../public/assets/userProfile.svg";
import { AVATAR_ICON, AVATAR_SIZE } from "./Avatar.constant";
import { useChangeImage, useClickAvatar } from "./hooks";

import Image from "next/image";

export interface AvatarProps {
  type?: "view" | "edit";
  size?: "small" | "medium" | "large";
  avatarImage: string | null;
  userId?: string;
  onChangeAvatar?: (file: File | null) => void;
}

const Avatar = ({
  type = "view",
  size = "small",
  avatarImage = null,
  userId,
  onChangeAvatar,
}: AvatarProps) => {
  const { preview, inputRef, handleChangeImage } = useChangeImage({ avatarImage, onChangeAvatar });
  const { handleClickAvatar } = useClickAvatar({ type, inputRef, userId, onChangeAvatar });
  const avatarImageSize = AVATAR_SIZE[size];
  const avatarIconSize = AVATAR_ICON[size];

  return (
    <div
      className={`relative ${avatarImageSize} ${(userId || type === "edit") && "cursor-pointer"}`}
      onClick={handleClickAvatar}
    >
      <div className="size-[100%] bg-gray-300 rounded-circle  overflow-hidden">
        <Image
          className="object-cover"
          src={preview || profileImage}
          alt="프로필 이미지 사진"
          sizes="100%"
          fill
          priority
        />
      </div>

      {type === "edit" && (
        <>
          <span
            className={`absolute bottom-0 right-0 ${avatarIconSize} bg-[#F1F1F1] rounded-full`}
          ></span>
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            name="profile"
            id="profile"
            onChange={handleChangeImage}
          />
        </>
      )}
    </div>
  );
};

export default Avatar;
