import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import * as vars from '@styles/color';

const rotate = (degree: number) => keyframes`
  to {
    stroke-dashoffset: ${100 - degree};
  }
`;

export const CircleStyled = styled('circle')<{ value: number }>`
  stroke: ${vars.blue000080};
  transform: rotate(-90deg);
  animation: ${({ value }) => rotate(value)} 1s linear forwards;
`;

export const PieChartContainer = styled('div')`
  width: 100%;
  height: 100%;
`;
