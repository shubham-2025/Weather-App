import { useState, useEffect } from "react";
import { getWeather } from "../utils/weather";


export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
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

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  return { weather, loading, error, fetchWeather };
};
