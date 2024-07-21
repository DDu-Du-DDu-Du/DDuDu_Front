import * as S from "./IconStoryBox.styles";

import React from "react";

interface IconBoxProps {
  children: React.ReactNode;
}

const IconStoryBox = ({ children }: IconBoxProps) => {
  return <S.IconStoryBoxStyle>{children}</S.IconStoryBoxStyle>;
};

export default IconStoryBox;
