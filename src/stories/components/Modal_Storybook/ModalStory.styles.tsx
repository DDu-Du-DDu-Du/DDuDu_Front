import styled from "styled-components";

import { motion } from "framer-motion";

export const ModalTestBox = styled.main`
  width: 16rem;
  height: 12rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOnButton = styled(motion.button)`
  width: 12rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: orange;
  border-radius: 0.8rem;

  color: white;
`;

export const ModalInnerItem = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  font-size: 1.6rem;

  border: 1px solid gray;
  border-radius: 0.6rem;
`;
