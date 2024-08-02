import styled from "styled-components";

export const TextInputStyle = styled.input<{ $hasError: boolean; $disabled: boolean }>`
  width: 100%;
  height: 5.6rem;
  padding: 0rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.example_gray_100};
  border-radius: 1.5rem;

  font-size: 1.5rem;

  /* border: ${({ $hasError, theme }) =>
    $hasError && `0.4rem double ${theme.colors.example_red_500}`}; */

  &:focus {
    outline: ${({ $hasError }) => ($hasError ? "" : "none")};
    border: ${({ $hasError, theme }) =>
      !$hasError && `0.3rem double ${theme.colors.example_gray_900}`};
  }

  cursor: ${({ $disabled }) => $disabled && "default"};
  opacity: ${({ $disabled }) => $disabled && 0.4};
`;
