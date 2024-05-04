import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { BottomSheetStateType } from "../../BottomSheet.type";

const useSheetDrag = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [startHeaderPosition, setStartHeaderPosition] = useState(0);
  const [movementHeight, setMovementHeight] = useState(0);

  const [sheetState, setSheetState] = useState<BottomSheetStateType>("default");
  const targetRef = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    const { current } = targetRef;

    if (!current) {
      return;
    }

    const { top } = current.getBoundingClientRect();
    const currentHeight = window.innerHeight - top;

    setStartHeaderPosition(top);
    setMovementHeight(currentHeight);
    setStartPosition(event.clientY);
    setIsDrag(true);
  }, []);

  const handleDragging = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      const currentHeight = window.innerHeight - startHeaderPosition;
      const { clientY } = event;
      const movementY = startPosition - clientY;

      const nextSheetHeight = Math.max(currentHeight + movementY);
      setMovementHeight(nextSheetHeight);
    },
    [startHeaderPosition, startPosition],
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setIsDrag(false);

      if (!window) {
        return;
      }

      const endPosition = event.clientY;
      const movementY = endPosition - startPosition;
      const movementPercentage = -Math.floor((movementY / window.innerHeight) * 100);

      setMovementHeight(0);

      if (movementPercentage >= 3) {
        setSheetState("full");
      }

      if (movementPercentage <= -3) {
        setSheetState(sheetState === "full" ? "default" : "close");
      }
    },
    [sheetState, startPosition],
  );

  useEffect(() => {
    if (isDrag) {
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("mousemove", handleDragging);
    }

    if (!isDrag) {
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("mousemove", handleDragging);
    }

    return () => {
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("mousemove", handleDragging);
    };
  }, [handleDragEnd, handleDragging, isDrag, startPosition]);

  return { sheetState, targetRef, handleDragStart, movementHeight };
};

export default useSheetDrag;
