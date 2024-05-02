"use client";

import { useCallback, useState } from "react";

import { CreateToastFunc } from "../../ToastProvider.type";

import { v4 as uuidV4 } from "uuid";

const useToastList = () => {
  const [toastList, setToastList] = useState<{ message: string; id: string }[]>([]);

  const removeToast = useCallback((toastId: string) => {
    setToastList((prevToast) => prevToast.filter(({ id }) => id !== toastId));
  }, []);

  const createToast: CreateToastFunc = useCallback(
    (message, options = {}) => {
      const { deleteTime = 3000 } = options;
      const id = uuidV4();

      setToastList((prevToast) => [...prevToast, { id: id.toString(), message }]);

      setTimeout(() => {
        removeToast(id.toString());
      }, deleteTime);
    },
    [removeToast],
  );

  return {
    toastList,
    createToast,
    removeToast,
  };
};

export default useToastList;
