import styled from "styled-components";

export const TimeLineItemLayout = styled.li`
  width: 100%;

  display: flex;
`;

export const TimeLineItemInner = styled.div`
  width: 5rem;
  min-width: 5rem;
`;

export const TimeLineItemContainer = styled.ul`
  flex-grow: 1;
  padding-right: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
