import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

interface privacyFormType {
  privacyType: GoalPrivacyType;
}

interface UsePrivacySheetProps {
  goalPrivacy: GoalPrivacyType;
  onClose: () => void;
  onClick: (goalPrivacy: GoalPrivacyType) => void;
}

const usePrivacySheet = ({ goalPrivacy, onClick, onClose }: UsePrivacySheetProps) => {
  const methods = useForm<privacyFormType>({
    defaultValues: {
      privacyType: goalPrivacy,
    },
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    methods.reset({ privacyType: goalPrivacy });
  }, [goalPrivacy]);

  const onValid: SubmitHandler<privacyFormType> = ({ privacyType }) => {
    onClick(privacyType);
    onClose();
  };

  const handlePrivacySubmit = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    methods.handleSubmit(onValid)(event);
  };

  return {
    methods,
    handlePrivacySubmit,
  };
};

export default usePrivacySheet;
