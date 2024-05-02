import { ToastProvider } from "@/app/_components/client";
import { CreateToastOptionsType } from "@/app/_components/client/Toast/ToastProvider.type";
import { useToast } from "@/app/_components/client/Toast/hooks";

interface ToastProps extends CreateToastOptionsType {
  message: string;
}

const ToastViewer = (prop: ToastProps) => {
  return (
    <section
      style={{
        width: "40rem",
        height: "60rem",
      }}
    >
      <ToastProvider>
        <ToastButton {...prop} />
      </ToastProvider>
    </section>
  );
};

export default ToastViewer;

const ToastButton = ({ message, type = "alert", deleteTime = 3000 }: ToastProps) => {
  const { createToast } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        createToast(message, {
          type,
          deleteTime,
        })
      }
      style={{
        width: "10rem",
        height: "4rem",
        margin: "1rem",
        backgroundColor: "#B6B6B6",
        borderRadius: "0.5rem",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "700",
      }}
    >
      토스트 생성
    </button>
  );
};
