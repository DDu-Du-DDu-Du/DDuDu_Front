interface ToastProps {
  message: string;
}

const ToastItem = ({ message }: ToastProps) => {
  return <li className="w-[18rem] h-[6rem] bg-slate-400 rounded-radius10">{message}</li>;
};

export default ToastItem;
