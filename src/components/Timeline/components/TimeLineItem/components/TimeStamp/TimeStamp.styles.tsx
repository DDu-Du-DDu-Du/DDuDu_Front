import styled from "styled-components";

export const TimeStampContainer = styled.div`
  width: 5rem;
  height: 5.7rem;
  padding-left: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimeStampContent = styled.p`
  width: 4rem;
  height: 2.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;

  font-size: 1.2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.example_shadow};
`;
