import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = (degree: number) => keyframes`
  to {
    stroke-dashoffset: ${100 - degree};
  }
`;

export const CircleStyled = styled('circle')<{ value: number }>`
  transform: rotate(-90deg);
  animation: ${({ value }) => rotate(value)} 1s linear forwards;
`;

export const PieChartContainer = styled('div')`
  width: 100%;
  height: 100%;
`;
