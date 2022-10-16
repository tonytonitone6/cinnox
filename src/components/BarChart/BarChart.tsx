import { FC } from 'react';

import { ValueType } from '@contexts/GlobalContext';
import {
  BarChartContainer,
  MetricPoint,
  BarUl,
  BarLi,
  Bar
} from './BarChart.style';
import { ChartType } from '@containers/reports';

// TODO Maybe we can add props as metric range in the future
const metricRange = ['100度', '50度', '0度'];

const BarChart: FC<ChartType> = ({ data = [] }): JSX.Element => {
  const renderMetric = (range: string, index: number) => {
    return (
      <li key={`range-${index}`}>
        <span>{range}</span>
      </li>
    );
  };

  const renderBar = (bar: ValueType) => {
    const { date, value } = bar;

    return (
      <BarLi key={date}>
        <Bar value={value}>
          <span>{value}度</span>
        </Bar>
        <span>{date}</span>
      </BarLi>
    );
  };

  return (
    <BarChartContainer>
      <MetricPoint>{metricRange.map(renderMetric)}</MetricPoint>
      <BarUl>{data.map(renderBar)}</BarUl>
    </BarChartContainer>
  );
};

export default BarChart;
