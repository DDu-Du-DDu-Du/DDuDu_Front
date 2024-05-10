import { useCallback } from "react";

import { useRouter } from "next/navigation";

interface useClickAvatarProps {
  type: "view" | "edit";
  inputRef: React.RefObject<HTMLInputElement>;
  userId?: string;
  onChangeAvatar?: (file: File | null) => void;
}

const useClickAvatar = ({ type, inputRef, userId, onChangeAvatar }: useClickAvatarProps) => {
  const router = useRouter();

  const handleClickAvatar = useCallback(() => {
    if (type === "view" && userId) {
      router.push(`/user/${userId}`);
    }

    if (type === "edit" && onChangeAvatar) {
      const { current } = inputRef;

      current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleClickAvatar };
};

export default useClickAvatar;
