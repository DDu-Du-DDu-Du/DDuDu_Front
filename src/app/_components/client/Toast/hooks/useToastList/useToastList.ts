"use client";

import { useCallback, useState } from "react";

import { v4 as uuidV4 } from "uuid";

const useToastList = () => {
  const [toastList, setToastList] = useState<{ message: string; id: string }[]>([]);

  const removeToast = useCallback((toastId: string) => {
    setToastList((prevToast) => prevToast.filter(({ id }) => id !== toastId));
  }, []);

  const createToast = useCallback(
    (message: string) => {
      const id = uuidV4();

      setToastList((prevToast) => [...prevToast, { id: id.toString(), message }]);

      setTimeout(() => {
        removeToast(id.toString());
      }, 3000);
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
