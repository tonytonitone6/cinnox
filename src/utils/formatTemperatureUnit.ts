export const formatTemperatureUnit = (
  temp: number,
  temperatureUnit: string = 'C'
) => {
  const celsius = temp - 273.15;
  const fahrenheit = celsius * (9 / 5) + 32;

  if (temperatureUnit === 'C') return parseFloat(celsius.toFixed(1));

  return parseFloat(fahrenheit.toFixed(1));
};
