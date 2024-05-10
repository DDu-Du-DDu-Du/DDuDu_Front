import React, { ChangeEventHandler } from "react";

import { AVATAR_ICON } from "../../Avatar.constant";

import { twJoin } from "tailwind-merge";

interface AvatarEditProps {
  size: "small" | "medium" | "large";
  inputRef: React.RefObject<HTMLInputElement>;
  handleChangeImage: ChangeEventHandler<HTMLInputElement>;
}

const AvatarEdit = ({ size, inputRef, handleChangeImage }: AvatarEditProps) => {
  return (
    <>
      <span
        className={twJoin(
          "absolute bottom-0 right-0 rounded-full bg-white_100 shadow-shadow_500",
          AVATAR_ICON[size],
        )}
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
  );
};

export default AvatarEdit;
