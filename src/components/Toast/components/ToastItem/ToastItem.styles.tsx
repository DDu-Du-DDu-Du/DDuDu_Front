import styled from "styled-components";

import { ToastType } from "../../ToastProvider.type";

import { motion } from "framer-motion";

export const ToastItemLayout = styled(motion.li)`
  width: 20rem;
  height: 6.5rem;

  position: relative;

  border-radius: ${({ theme }) => theme.borderRadius.radius5};

  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.2);

  overflow: hidden;
`;

export const ToastCloseButton = styled.button`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;

  transition: opacity 0.3;

  &:hover {
    opacity: 0.3;
  }
`;

export const ToastItemContent = styled.p`
  width: 20rem;
  height: 6rem;
  padding: 1.4rem 1rem 1rem 1rem;
`;

export const ToastProgressbarOutline = styled.div`
  width: 20rem;
  height: 0.5rem;

  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.example_gray_500};
`;

export const ToastProgressbar = styled(motion.div)<{ $toastType: ToastType }>`
  width: 20rem;
  height: 0.5rem;

  translate: -100%;

  background-color: ${({ theme, $toastType }) => {
    if ($toastType === "alert") {
      return theme.colors.example_orange_500;
    }

    if ($toastType === "safe") {
      return theme.colors.example_green_100;
    }

    if ($toastType === "warning") {
      return theme.colors.example_yellow_500;
    }

    if ($toastType === "danger") {
      return theme.colors.example_red_500;
    }

    return theme.colors.example_orange_500;
  }};
`;
