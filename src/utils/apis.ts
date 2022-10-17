import { AxiosResponse } from 'axios';

import { apiClientFactory } from './apiFactory';

const url = 'https://api.openweathermap.org/data/2.5';
const WEATHER_TOKEn = process.env.REACT_APP_WEATHER_TOKEN;
const client = apiClientFactory({
  baseURL: url
});

type WeatherParamsType = {
  city: string;
  cnt: number;
};

export const GETv1WeatherForecast = ({
  city,
  cnt
}: WeatherParamsType): Promise<AxiosResponse<{ list: unknown[] }>> => {
  const url = `/forecast?q=${city}&appid=${WEATHER_TOKEn}`;

  return client.get(url);
};
