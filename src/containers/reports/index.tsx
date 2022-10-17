import { useEffect, useState } from 'react';
import * as R from 'ramda';
import styled from '@emotion/styled';

import BarChart from '@components/BarChart/BarChart';
import PieChart from '@components/PieChart/PieChart';
import LoadingSkeleton from '@components/LoadSkelton/LoadSkelton';
import { GETv1WeatherForecast } from '@utils/apis';
import {
  useStore,
  updateWeatherListByCity,
  ValueType
} from '@contexts/GlobalContext';
import { getFilterDateWithCondition } from '@utils/getFilterDateByCondition';
import { getSliceData } from '@utils/getSliceData';

const LIMIT_RECORDS = 4;

export type ChartType = {
  data: ValueType[];
};

const ChartSection = styled('div')<{ direction?: 'row' | 'column' }>`
  margin: 50px 0;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
`;

const SectionTitle = styled('h2')`
  width: 100%;
`;

const HumidityBlock = styled('div')`
  display: flex;
  height: 100%;
`;

const Reports = () => {
  // REMARK You can move loading status to context makes influence others component
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state, dispatch } = useStore();
  const { data, searchWords } = state;

  useEffect(() => {
    if (searchWords) {
      GETv1WeatherForecast({ city: searchWords, cnt: 20 })
        .then((forecastData) => {
          const {
            data: { list: weatherList = [] }
          } = forecastData;

          // REMARK free version only supported 3 hours 5days data, and it has limitation(4) with requirement
          const filteredWeatherList = R.compose(
            (list) => getSliceData(list, LIMIT_RECORDS),
            getFilterDateWithCondition
          )(weatherList, '21:00:00');

          updateWeatherListByCity(dispatch, filteredWeatherList);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // dispatch fetch fail
        });
    }
  }, [dispatch, searchWords]);

  return (
    <div data-testid="reports">
      <ChartSection>
        <SectionTitle>最高溫</SectionTitle>
        {isLoading ? <LoadingSkeleton /> : <BarChart data={data.temp_max} />}
      </ChartSection>
      <ChartSection>
        <SectionTitle>最低溫</SectionTitle>
        {isLoading ? <LoadingSkeleton /> : <BarChart data={data.temp_min} />}
      </ChartSection>
      <ChartSection direction="column">
        <SectionTitle>濕度</SectionTitle>
        <HumidityBlock>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            data.humidity.map((humidityData) => (
              <PieChart key={humidityData.date} data={humidityData} />
            ))
          )}
        </HumidityBlock>
      </ChartSection>
    </div>
  );
};

export default Reports;
