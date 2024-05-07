"use client";

import { useMemo } from "react";

import { useSelectedLayoutSegments } from "next/navigation";

/**
 * @brief 현재 접속한 URL(Segments)을 기반으로 헤더의 텍스트, 우측 버튼을 커스텀할 수 있습니다. 커스텀을 원하는 경로를 case에 추가한 후, 변수를 수정하시면 됩니다.
 * @returns headerLabel: 헤더의 텍스트, rightButtonIcon: 우측 버튼 아이콘, rightButtonFn: 우측 버튼 콜백 함수 (존재하지 않을 경우 렌더링하지 않음)
 */
const useSegmentConvert = () => {
  const segments = useSelectedLayoutSegments();

  const { headerLabel, rightButtonIcon, rightButtonFn } = useMemo(() => {
    let headerLabel = "";
    let rightButtonIcon: JSX.Element | null = null;
    let rightButtonFn: (() => void) | undefined = undefined;

    switch (segments[0]) {
      case "example":
        headerLabel = "example";
        rightButtonFn = () => {};
        rightButtonIcon = null;
        break;

      default:
        break;
    }

    return { headerLabel, rightButtonIcon, rightButtonFn };
  }, [segments]);

  return { headerLabel, rightButtonIcon, rightButtonFn };
};

export default useSegmentConvert;
