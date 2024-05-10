"use client";

import { useEffect, useRef } from "react";

type CallbackType = (event?: MouseEvent | TouchEvent) => void;

const EVENT_LIST: ["mousedown", "touchstart"] = ["mousedown", "touchstart"];

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

    EVENT_LIST.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });

    return () => {
      EVENT_LIST.forEach((eventName) => {
        window.removeEventListener(eventName, eventHandler);
      });
    };
  }, []);

  return ref;
};

export default useClickAway;
