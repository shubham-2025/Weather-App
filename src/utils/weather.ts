import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const weatherBackgrounds = {
  "clear sky": "url('/clear-sky.webp')",
  "few clouds": "url('/clouds.webp')",
  "scattered clouds": "url('/clouds.webp')",
  "broken clouds": "url('/clouds.webp')",
  "shower rain": "url('/rain.webp')",
  rain: "url('/rain.webp')",
  thunderstorm: "url('/thunderstorm.webp')",
  snow: "url('/snow.webp')",
  mist: "url('/haze.webp')",
  haze: "url('/haze.webp')",
  default: "url('/clear-sky.webp')", // Default background
};

export async function getWeather(city: string, system: "metric" | "imperial") {
  const response = await axios.get(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=${system}`
  );
  return response.data;
}

export async function getForecast(city: string, system: "metric" | "imperial") {
  const response = await axios.get(
    `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=${system}`
  );
  return response.data;
}
