import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const weatherBackgrounds = {
  "clear sky": "url('/clear-sky.jpg')",
  "few clouds": "url('/cloudy.jpg')",
  "overcast clouds": "url('/cloudy.jpg')",
  "scattered clouds": "url('/cloudy.jpg')",
  "broken clouds": "url('/cloudy.jpg')",
  "shower rain": "url('/rain.webp')",
   rain: "url('/rain.webp')",
  "moderate rain": "url('/rain.webp')",
  "light rain": "url('/rain.webp')",
  thunderstorm: "url('/thunderstorm.webp')",
  snow: "url('/snow.webp')",
  mist: "url('/haze.jpg')",
  haze: "url('/haze.jpg')",
  smoke: "url('/haze.jpg')",
  fog: "url('/haze.jpg')",
  default: "url('/sunny.jpg')", // Default background
};

export const weatherIcons = {
  "clear sky": WiDaySunny,
  "few clouds": WiCloud,
  "scattered clouds": WiCloudy,
  "broken clouds": WiCloudy,
  "shower rain": WiShowers,
  rain: WiRain,
  "moderate rain": WiRain,
  "light rain": WiRain,
  thunderstorm: WiThunderstorm,
  snow: WiSnow,
  mist: WiFog,
  haze: WiFog,
  smoke: WiFog,
  fog: WiFog,
  default: WiDaySunny,
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

export const formatTimeWithTimezone = (timestamp: number, timezone: number) => {
  // Create date by adding timezone offset to UTC
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};
