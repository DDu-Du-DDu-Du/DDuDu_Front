import { useState } from "react";

interface UseToggleFollowProps {
  isFollowing: boolean;
  isPrivate: boolean;
  isRequestFollow: boolean;
  openModal: () => void;
}

const useToggleFollow = ({
  isFollowing,
  isPrivate,
  isRequestFollow,
  openModal,
}: UseToggleFollowProps) => {
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [isFollowRequesting, setIsFollowRequesting] = useState(isRequestFollow);

  const handleFollowCheck = (isComplete: boolean) => {
    if (!isComplete) {
      return;
    }

    setIsFollow(false);
    setIsFollowRequesting(false);
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
      setIsFollowRequesting(true);
      setIsFollow(true);
    }

    if (isFollow === true) {
      // 팔로우 취소
      if (isFollowRequesting && openModal) {
        // 팔로우 요청중인 경우 요청 취소 모달 등장
        openModal();
      } else {
        // 이미 팔로잉중인 경우 즉시 취소
        setIsFollow(false);
      }
    }
  };

  return {
    isFollow,
    isFollowRequesting,
    handleToggleFollow,
    handleFollowCheck,
  };
};

export default useToggleFollow;
