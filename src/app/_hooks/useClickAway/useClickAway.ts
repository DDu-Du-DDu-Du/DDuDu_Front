"use client";

import { useEffect, useRef } from "react";

type CallbackType = (event?: MouseEvent | TouchEvent) => void;

const useClickAway = <T>(callback: CallbackType) => {
  const ref = useRef<T | null>(null);
  const memoCallback = useRef(callback);

  useEffect(() => {
    memoCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const { current } = ref;

    if (!current || !(current instanceof HTMLElement)) {
      return;
    }

    const eventHandler = (event: MouseEvent | TouchEvent) => {
      const { target } = event;

      if (!target || !(target instanceof HTMLElement)) {
        return;
      }

      if (current.contains(target)) {
        return;
      }

      memoCallback.current(event);
    };

    window.addEventListener("mousedown", eventHandler);
    window.addEventListener("touchstart", eventHandler);

    return () => {
      window.removeEventListener("mousedown", eventHandler);
      window.removeEventListener("touchstart", eventHandler);
    };
  }, []);

  return ref;
};

export default useClickAway;
