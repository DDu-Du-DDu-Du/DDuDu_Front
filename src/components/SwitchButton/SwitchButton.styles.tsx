import styled from "styled-components";

export const SwitchButtonLayout = styled.button`
  width: 16rem;
  height: 3rem;

  position: relative;

  display: flex;

  background-color: ${({ theme }) => theme.colors.example_gray_300};
  border-radius: ${({ theme }) => theme.borderRadius.radius5};

  font-size: 1.3rem;

  user-select: none;
  cursor: pointer;
`;

export const SwitchButtonLabel = styled.div`
  width: 50%;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
`;

export const SwitchButtonMove = styled.div<{ $isToggle: boolean }>`
  width: 50%;
  height: 3rem;

  position: absolute;

  background-color: ${({ theme }) => theme.colors.white_100};

  border: solid 0.2rem ${({ theme }) => theme.colors.example_gray_500};
  border-radius: ${({ theme }) => theme.borderRadius.radius5};

  transition: transform 200ms ease-in-out;

  transform: translateX(${({ $isToggle }) => ($isToggle ? "0%" : "100%")});
`;
