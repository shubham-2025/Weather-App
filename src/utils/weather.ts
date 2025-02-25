import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeather(city: string) {
  const response = await axios.get(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
}

export async function getForecast(city: string) {
  const response = await axios.get(
    `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
}
