import { useState } from "react";
import { getForecast, getWeather } from "../utils/weather";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [errorForecast, setErrorForecast] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getWeather(city, unit);
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
      setLoadingForecast(true);
      setErrorForecast(null);
      const data = await getForecast(city, unit);
      setForecast(data);
    } catch (err) {
      setErrorForecast(
        err instanceof Error ? err.message : "Failed to fetch forecast data"
      );
      setForecast(null);
    } finally {
      setLoadingForecast(false);
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
    forecast,
    fetchForecast,
    unit,
    setUnit,
    errorForecast,
    loadingForecast,
    setLoadingForecast,
    setErrorForecast,
  };
};
