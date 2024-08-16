import styled, { css } from "styled-components";

import { motion } from "framer-motion";

const MAIN_BUTTON_STYLE = css`
  height: 8rem;
  flex-grow: 2;

  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;

  background-color: ${({ theme }) => theme.colors.example_gray_100};
  border-radius: ${({ theme }) => theme.borderRadius.radius10};
`;

const SUB_BUTTON_STYLE = css`
  width: 100%;
  height: 3.2rem;

  gap: 1.6rem;
`;

export const SheetButtonLayout = styled(motion.button)<{ $buttonType: "main" | "sub" }>`
  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize.size13};

  ${({ $buttonType }) => ($buttonType === "main" ? MAIN_BUTTON_STYLE : SUB_BUTTON_STYLE)}
`;

export const SheetButtonTitle = styled.p<{ $buttonType: "main" | "sub" }>`
  ${({ $buttonType }) =>
    $buttonType === "sub" &&
    css`
      flex-grow: 1;
      text-align: start;
    `}
`;
