import styled from "styled-components";

import { motion } from "framer-motion";

export const ModalBackground = styled(motion.section)`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #23232390;

  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const ModalLayout = styled(motion.article)<{
  $width: string;
  $height: string;
  $backgroundColor?: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  position: relative;

  border-radius: ${({ theme }) => theme.borderRadius.radius10};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow.shadow_100};
`;
