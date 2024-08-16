import styled from "styled-components";

import { hexConvertForRGBA } from "@/lib/utils";

import { motion } from "framer-motion";

export const TimeItemLayout = styled.li`
  width: 100%;

  position: relative;
`;

export const TimeItemContainer = styled.div`
  width: 5rem;
  height: 100%;

  position: absolute;
  top: 0;
  right: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Icon

export const TimeItemIconLayout = styled.div`
  height: 5.7rem;

  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${({ theme }) => theme.zIndex.timeline_icon};
`;

export const TimeItemIconOutline = styled.div<{ $status: "COMPLETE" | "UNCOMPLETED" }>`
  width: 2.2rem;
  height: 2.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme, $status }) =>
    $status === "COMPLETE" ? theme.colors.example_gray_900 : theme.colors.example_gray_300};
`;

export const TimeItemIconInner = styled.div`
  width: 1.6rem;
  height: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.white_100};
`;

export const TimeItemIconComplete = styled.div`
  width: 1.2rem;
  height: 1.2rem;

  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.example_gray_900};
`;

// LastItem

export const TimeLineDivider = styled.hr<{ $status: "COMPLETE" | "UNCOMPLETED" }>`
  width: 0.3rem;
  height: 100%;

  position: absolute;
  top: 3rem;

  background-color: ${({ theme, $status }) =>
    $status === "COMPLETE" ? theme.colors.example_gray_900 : theme.colors.example_gray_300};

  z-index: ${({ theme }) => theme.zIndex.timeline_line};
`;

// DDuDu Button

export const TimeItemButton = styled(motion.button)`
  width: 100%;
  min-height: 5.7rem;
  padding: 1.2rem 1.6rem;

  display: flex;
  flex-direction: column;

  border-radius: 1.5rem;
  background-color: ${({ theme }) =>
    hexConvertForRGBA({ hex: theme.colors.example_gray_900, alpha: 0.1 })};
`;

export const TimeItemButtonContent = styled.p`
  font-size: 1.4rem;
  text-align: start;
`;

export const TimeItemButtonTime = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.example_gray_900};
`;
