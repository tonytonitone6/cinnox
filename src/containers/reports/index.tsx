import React, { useEffect } from 'react';

import BarChart from '@components/BarChart/BarChart';
import { GETv1WeatherForecast } from '@utils/apis';
import { useStore, updateWeatherListByCity } from '@contexts/GlobalContext';

const Reports = () => {
  const { state, dispatch } = useStore();
  const { searchWords } = state;

  useEffect(() => {
    if (searchWords) {
      const getWeatherDataList = async () => {
        try {
          const response = await GETv1WeatherForecast({
            city: searchWords,
            cnt: 20
          });
          const {
            data: { list: weatherList = [] }
          } = response;

          updateWeatherListByCity(dispatch, weatherList, 4);
        } catch (error) {
          // dispatch fetch fail
        }
      };
      getWeatherDataList();
    }
  }, [dispatch, searchWords]);

  return (
    <>
      <BarChart data={state.data.temp_max} />
    </>
  );
};

export default Reports;
