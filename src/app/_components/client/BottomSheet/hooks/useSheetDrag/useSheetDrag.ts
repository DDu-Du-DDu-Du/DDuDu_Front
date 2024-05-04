import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { BottomSheetStateType } from "../../BottomSheet.type";

interface UseSheetDrag {
  onClose?: () => void;
}

const useSheetDrag = ({ onClose }: UseSheetDrag) => {
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
      const movementY = startPosition - event.clientY;
      const nextSheetHeight = Math.max(currentHeight + movementY, 0);

      setMovementHeight(nextSheetHeight);
    },
    [startHeaderPosition, startPosition],
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setIsDrag(false);

      const movementY = event.clientY - startPosition;
      const movementPercentage = -Math.floor((movementY / window.innerHeight) * 100);
      setMovementHeight(0);

      if (movementPercentage >= 3) {
        setSheetState("full");
      }

      if (movementPercentage <= -3) {
        if (sheetState === "full") {
          setSheetState("default");
          return;
        }

        if (sheetState === "default" && onClose) {
          onClose();
          return;
        }

        setSheetState("close");
      }
    },
    [onClose, sheetState, startPosition],
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

  const initState = () => {
    setSheetState("default");
  };

  return { sheetState, targetRef, handleDragStart, movementHeight, initState };
};

export default useSheetDrag;
