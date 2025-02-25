import { useState } from "react";
import { getForecast, getWeather } from "../utils/weather";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getForecast(city);
      setForecast(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch forecast data"
      );
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };


  return { weather, loading, error, fetchWeather, forecast, fetchForecast };
};
