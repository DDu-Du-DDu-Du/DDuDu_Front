import {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { BottomDraggingStateType, BottomSheetStateType } from "../../BottomSheet.type";

interface UseSheetDrag {
  onClose?: () => void;
}

const useSheetDrag = ({ onClose }: UseSheetDrag) => {
  const [isDrag, setIsDrag] = useState(false);
  const [draggingState, setDraggingState] = useState<BottomDraggingStateType>("center");
  const [startPosition, setStartPosition] = useState(0);
  const [startHeaderPosition, setStartHeaderPosition] = useState(0);
  const [movementHeight, setMovementHeight] = useState(0);

  const [sheetState, setSheetState] = useState<BottomSheetStateType>("default");
  const targetRef = useRef<HTMLElement | null>(null);

  const handleStartAction = useCallback(
    (event: ReactMouseEvent<HTMLElement> | ReactTouchEvent<HTMLElement>) => {
      event.preventDefault();
      const { current } = targetRef;

      if (!current) {
        return;
      }

      const { top } = current.getBoundingClientRect();
      const currentHeight = window.innerHeight - top;

      setStartHeaderPosition(top);
      setMovementHeight(currentHeight);
      setIsDrag(true);

      if (event.type === "touchstart" && "touches" in event) {
        setStartPosition(event.touches[0].clientY);
        return;
      }

      if (event.type === "mousedown" && "clientY" in event) {
        setStartPosition(event.clientY);
      }
    },
    [],
  );

  const handleMoveAction = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrag) {
        return;
      }

      let movementY = 0;

      if (event.type === "touchmove" && "touches" in event) {
        movementY = startPosition - event.touches[0].clientY;
      }

      if (event.type === "mousemove" && "clientY" in event) {
        movementY = startPosition - event.clientY;
      }

      const startingHeight = window.innerHeight - startHeaderPosition;
      const nextSheetHeight = Math.max(startingHeight + movementY, 0);

      setMovementHeight(nextSheetHeight);

      if (nextSheetHeight > startingHeight + 10) {
        setDraggingState("up");
        return;
      }

      if (nextSheetHeight < startingHeight - 10) {
        setDraggingState("down");
        return;
      }

      setDraggingState("center");
    },
    [isDrag, startHeaderPosition, startPosition],
  );

  const handleEndAction = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrag) {
        return;
      }

      setIsDrag(false);

      let movementY = 0;

      if (event.type === "touchend" && "changedTouches" in event) {
        movementY = event.changedTouches[0].clientY - startPosition;
      }

      if (event.type === "mouseup" && "clientY" in event) {
        movementY = event.clientY - startPosition;
      }

      const movementPercentage = -Math.floor((movementY / window.innerHeight) * 100);

      setMovementHeight(0);
      setDraggingState("center");

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
    [isDrag, onClose, sheetState, startPosition],
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleEndAction);
    window.addEventListener("mousemove", handleMoveAction);
    window.addEventListener("touchend", handleEndAction);
    window.addEventListener("touchmove", handleMoveAction);

    return () => {
      window.removeEventListener("mouseup", handleEndAction);
      window.removeEventListener("mousemove", handleMoveAction);
      window.removeEventListener("touchend", handleEndAction);
      window.removeEventListener("touchmove", handleMoveAction);
    };
  }, [handleEndAction, handleMoveAction]);

  const initState = () => {
    setSheetState("default");
  };

  return {
    targetRef,
    sheetState,
    draggingState,
    movementHeight,
    handleStartAction,
    initState,
  };
};

export default useSheetDrag;
