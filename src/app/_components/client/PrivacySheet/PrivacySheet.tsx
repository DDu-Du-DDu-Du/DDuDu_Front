"use client";

import { Fragment } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { BottomSheet, Button } from "@/app/_components/client";
import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

import { SheetRadioItem } from "./components";
import { PRIVACY_LIST } from "./privacySheet.constants";

interface privacyFormType {
  privacyType: GoalPrivacyType;
}

interface PrivacySheetProps {
  goalPrivacy: GoalPrivacyType;
  isShow: boolean;
  onClose: () => void;
  onClick: (goalPrivacy: GoalPrivacyType) => void;
}

const PrivacySheet = ({ goalPrivacy, isShow, onClose, onClick }: PrivacySheetProps) => {
  const methods = useForm<privacyFormType>({
    defaultValues: {
      privacyType: goalPrivacy,
    },
  });

  const onValid: SubmitHandler<privacyFormType> = ({ privacyType }) => {
    onClick(privacyType);
    onClose();
  };

  const handlePrivacySubmit = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    methods.handleSubmit(onValid)(event);
  };

  return (
    <BottomSheet
      isShow={isShow}
      onClose={onClose}
      defaultHeight="fit-content"
      maxHeight="fit-content"
    >
      <FormProvider {...methods}>
        <form
          className="p-[2rem] box-border"
          onSubmit={handlePrivacySubmit}
        >
          <ul className="flex flex-col px-[0.4rem] gap-[1.6rem] mb-[2.1rem]">
            {PRIVACY_LIST.map(({ id, name, value, label }, index) => (
              <Fragment key={index}>
                <SheetRadioItem
                  id={id}
                  name={name}
                  value={value}
                  label={label}
                />
              </Fragment>
            ))}
          </ul>
          <Button
            className="w-full h-[5.6rem]"
            type="submit"
            fontSize="large"
            backgroundColor="orange"
          >
            확인
          </Button>
        </form>
      </FormProvider>
    </BottomSheet>
  );
};

export default PrivacySheet;
