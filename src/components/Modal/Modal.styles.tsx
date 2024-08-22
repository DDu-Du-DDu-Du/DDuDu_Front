import styled from "styled-components";

import { motion } from "framer-motion";

export const ModalBackground = styled(motion.section)<{
  $width: string;
  $height: string;
  $backgroundColor?: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  position: fixed;
  left: 50%;
  top: 50%;

  border-radius: ${({ theme }) => theme.borderRadius.radius10};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow.shadow_100};

  text-align: center;

  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const ModalSpacing = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 10rem;

  opacity: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;
