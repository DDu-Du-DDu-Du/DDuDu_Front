import * as S from "./ToastItem.styles";

import { CloseIcon } from "@/components/icons";

const ToastItem = () => {
  return (
    <S.ToastItemLayout>
      <S.ToastCloseButton>
        <CloseIcon size={16} />
      </S.ToastCloseButton>

      <S.ToastItemContent>이건이건 저건 이건 저런건 이런건 안되고 이런건 저런건</S.ToastItemContent>

      <S.ToastProgressbarOutline>
        <S.ToastProgressbar />
      </S.ToastProgressbarOutline>
    </S.ToastItemLayout>
  );
};

export default ToastItem;
