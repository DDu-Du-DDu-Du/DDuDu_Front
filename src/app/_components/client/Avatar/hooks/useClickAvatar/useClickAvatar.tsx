import { useRouter } from "next/navigation";

interface useClickAvatarProps {
  type?: "view" | "edit";
  inputRef: React.RefObject<HTMLInputElement>;
  userId?: string;
  onChangeAvatar?: (file: File | null) => void;
}

const useClickAvatar = ({ type, inputRef, userId, onChangeAvatar }: useClickAvatarProps) => {
  const router = useRouter();

  const handleClickAvatar = () => {
    if (type === "view" && userId) {
      router.push(`/user/${userId}`);
    }

    if (type === "edit" && onChangeAvatar) {
      const { current } = inputRef;

      current?.click();
    }
  };

  return { handleClickAvatar };
};

export default useClickAvatar;
