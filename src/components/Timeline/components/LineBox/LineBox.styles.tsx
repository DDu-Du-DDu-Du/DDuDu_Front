import styled from "styled-components";

export const LineBoxContainer = styled.div`
  width: 5rem;
  height: 100%;

  position: absolute;
  left: 5rem;

  display: flex;
  justify-content: center;
`;

export const LineBoxDivider = styled.hr`
  width: 0.3rem;
  height: 100%;

  position: relative;

  &::before {
    content: "";

    width: 0.3rem;
    height: 100%;

    position: absolute;
    left: 50%;

    border-left: 0.3rem dashed;

    transform: translateX(50%);
  }
`;
