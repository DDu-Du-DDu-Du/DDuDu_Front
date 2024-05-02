"use client";

import { useCallback, useState } from "react";

import { CreateToastFunc, ToastType } from "../../ToastProvider.type";

import { v4 as uuidV4 } from "uuid";

interface ToastListItemType {
  message: string;
  id: string;
  deleteTime: number;
  type: ToastType;
}

const useToastList = () => {
  const [toastList, setToastList] = useState<ToastListItemType[]>([]);

  const removeToast = useCallback((toastId: string) => {
    setToastList((prevToast) => prevToast.filter(({ id }) => id !== toastId));
  }, []);

  const createToast: CreateToastFunc = useCallback(
    (message, options = {}) => {
      const { deleteTime = 3000, type = "alert" } = options;
      const id = uuidV4();

      setToastList((prevToast) => [...prevToast, { id: id.toString(), message, deleteTime, type }]);

      setTimeout(() => {
        removeToast(id.toString());
      }, deleteTime + 1000);
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
