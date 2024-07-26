import * as S from "./ToastProvider.styles";

import { ToastItem } from "./components";
import { useToastStore } from "./store";

export interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toastList, removeToast } = useToastStore();

  return (
    <>
      {children}

      <S.ToastBox>
        {toastList.map(({ id, message, deleteTime, type }) => (
          <ToastItem
            key={id}
            message={message}
            deleteTime={deleteTime}
            type={type}
            onRemove={() => removeToast(id)}
          />
        ))}
      </S.ToastBox>
    </>
  );
};

export default ToastProvider;
