import { FC } from 'react';

import { PieChartContainer, CircleStyled } from './PieChart.style';
import { ValueType } from '@contexts/GlobalContext';

type PieChartType = {
  data: ValueType;
};

const PieChart: FC<PieChartType> = ({ data }): JSX.Element => {
  const { date, value } = data;
  return (
    <PieChartContainer>
      <svg width="100%" height="100%" viewBox="-100 -100 200 200">
        <CircleStyled
          value={value}
          r={85}
          pathLength={100}
          fill="transparent"
          strokeDasharray={100}
          strokeDashoffset={100}
          strokeWidth={30}
        />
        <text textAnchor="middle">{date}</text>
        <text textAnchor="middle" y="20px">
          {value}%
        </text>
      </svg>
    </PieChartContainer>
  );
};

export default PieChart;
