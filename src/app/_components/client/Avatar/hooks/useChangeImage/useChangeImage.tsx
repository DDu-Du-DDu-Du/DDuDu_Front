import { ChangeEventHandler, useCallback, useRef, useState } from "react";

import { IMAGE_TYPES } from "../../Avatar.constant";

interface useChangeImageProps {
  userImage: string | null;
  onChangeAvatar?: (file: File | null) => void;
}

const useChangeImage = ({ userImage, onChangeAvatar }: useChangeImageProps) => {
  const [preview, setPreview] = useState(userImage);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!event.target.files || !onChangeAvatar) {
        return;
      }

      const file = event.target.files[0];
      const fileType = file.type;

      if (!IMAGE_TYPES[fileType]) {
        alert("파일 형식이 올바르지 않습니다. 이미지 파일을 업로드해 주세요.");
        event.target.value = "";
        return;
      }

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        if (typeof fileReader.result !== "string") {
          return;
        }

        setPreview(fileReader.result);
      };

      fileReader.readAsDataURL(file);
      onChangeAvatar(file);
    },
    [onChangeAvatar, setPreview],
  );

  return {
    preview,
    inputRef,
    handleChangeImage,
  };
};

export default useChangeImage;
