import * as S from "./ToastProvider.styles";

export interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}

      <S.ToastBox>ToastProvider</S.ToastBox>
    </>
  );
};

export default ToastProvider;
