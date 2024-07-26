import useToastStore from "../../store/useToastStore/useToastStore";

const useToast = () => {
  const { createToast } = useToastStore();

  return { createToast };
};

export default useToast;
