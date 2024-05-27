import { useState } from "react";

interface UseToggleFollowProps {
  isFollowing: boolean;
  isPrivate: boolean;
  handleToggleOn: () => void;
}

const useToggleFollow = ({ isFollowing, isPrivate, handleToggleOn }: UseToggleFollowProps) => {
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [isPrivateFollow, setIsPrivateFollow] = useState(false);

  const handleFollowCheck = (isComplete: boolean) => {
    if (!isComplete) {
      return;
    }

    setIsFollow(false);
    setIsPrivateFollow(false);
  };

  const handleToggleFollow = () => {
    if (!isPrivate) {
      // 공개 계정인 경우
      setIsFollow((prevState) => !prevState);
      return;
    }

    // 비공개 계정인 경우
    if (isFollow === false) {
      // 팔로우 요청
      setIsPrivateFollow(true);
      setIsFollow(true);
    }

    if (isFollow === true) {
      // 팔로우 취소
      if (isPrivateFollow && handleToggleOn) {
        // 팔로우 요청중인 경우 요청 취소 모달 등장
        handleToggleOn();
      } else {
        // 이미 팔로잉중인 경우 즉시 취소
        setIsFollow(false);
      }
    }
  };

  return {
    isFollow,
    isPrivateFollow,
    handleToggleFollow,
    handleFollowCheck,
  };
};

export default useToggleFollow;
