"use client";

import { ReactNode, useEffect, useState } from "react";

import ArrowLeftIcon from "@/app/_components/server/Icons/staticIcons/ArrowLeftIcon/ArrowLeftIcon";

import { useRouter } from "next/navigation";

interface useSegmentConverProps {
  segments: string[];
}

const useSegmentConvert = ({ segments }: useSegmentConverProps) => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(true);
  const [headerLabel, setHeaderLabel] = useState<string>("");
  const [leftButtonIcon, setLeftButtonIcon] = useState<ReactNode>(ArrowLeftIcon);
  const [leftButtonFn, setLeftButtonFn] = useState<() => void>(() => router.back);
  const [rightButtonIcon, setRightButtonIcon] = useState<ReactNode>();
  const [rightButtonFn, setRightButtonFn] = useState<() => void>();

  // TODO: 페이지 라우트 구조 생성 후, 와이어프레임에 맞게 setter 조정
  useEffect(() => {
    switch (segments[0]) {
      case undefined: // 메인페이지
        // setVisible(false);
        setHeaderLabel("메인");
        break;

      case "example": // URL이 /example일 때
        setVisible(false);
        setLeftButtonFn(() => {});
        setRightButtonFn(() => {});
        setLeftButtonIcon(null);
        setRightButtonIcon(null);
        break;

      default:
        break;
    }
  }, [segments]);

  return [visible, headerLabel, leftButtonIcon, leftButtonFn, rightButtonIcon, rightButtonFn];
};

export default useSegmentConvert;
