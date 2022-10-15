import React, { FC } from 'react';

import { ValueType } from '@contexts/GlobalContext';

type BarChartType = {
  data: ValueType[];
};

const BarChart: FC<BarChartType> = ({ data }) => {
  return <div></div>;
};

export default BarChart;
