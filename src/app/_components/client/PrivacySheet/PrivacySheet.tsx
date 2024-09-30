"use client";

import { Fragment } from "react";
import { FormProvider } from "react-hook-form";

import { BottomSheet } from "@/app/_components/client";
import { GoalPrivacyType } from "@/app/_types/response/goal/goal";

import { SheetRadioItem } from "./components";
import { usePrivacySheet } from "./hooks";
import { PRIVACY_LIST } from "./privacySheet.constants";

interface PrivacySheetProps {
  goalPrivacy: GoalPrivacyType;
  isShow: boolean;
  onClose: () => void;
  onClick: (goalPrivacy: GoalPrivacyType) => void;
}

const PrivacySheet = ({ goalPrivacy, isShow, onClose, onClick }: PrivacySheetProps) => {
  const { methods, handlePrivacySubmit } = usePrivacySheet({ goalPrivacy, onClose, onClick });

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
          <button
            className="w-full h-[5.6rem] bg-example_gray_700 rounded-radius15"
            type="submit"
          >
            확인
          </button>
        </form>
      </FormProvider>
    </BottomSheet>
  );
};

export default PrivacySheet;
