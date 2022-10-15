import { AxiosResponse } from 'axios';

import { apiClientFactory } from './apiFactory';

const url = 'https://api.openweathermap.org/data/2.5';
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
  const url = `/forecast?q=${city}&appid=9206a68a8959e10e39f8cb49a708e310`;

  return client.get(url);
};
