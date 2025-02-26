import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import { weatherBackgrounds } from "../utils/weather";

function Homepage() {
  const { address } = useGeolocation();
  const { fetchWeather, weather, forecast, fetchForecast } = useWeather();

  useEffect(() => {
    if (address) {
      fetchWeather("Nagpur");
      fetchForecast("Nagpur");
    }
  }, [address]);

  useEffect(() => {
    if (weather) {
      const weatherCondition = weather.weather[0].description.toLowerCase();
      console.log(weatherCondition);

      const background =
        weatherBackgrounds[
          weatherCondition as keyof typeof weatherBackgrounds
        ] || "url('/clear-sky.webp')";
      // const background = "url('/snow.webp')";

      console.log(background);

      document.body.style.backgroundImage = background;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";

      document.body.classList.remove(
        "weather-sunny",
        "weather-night",
        "weather-rainy",
        "weather-cloudy",
        "weather-misty",
        "weather-snowy"
      );

      if (
        weatherCondition.includes("clear") ||
        weatherCondition.includes("sun")
      ) {
        document.body.classList.add("weather-sunny");
      } else if (weatherCondition.includes("cloud")) {
        document.body.classList.add("weather-cloudy");
      } else if (weatherCondition.includes("rain")) {
        document.body.classList.add("weather-rainy");
      } else if (
        weatherCondition.includes("mist") ||
        weatherCondition.includes("haze")
      ) {
        document.body.classList.add("weather-misty");
      } else if (weatherCondition.includes("snow")) {
        document.body.classList.add("weather-snowy");
      } else {
        document.body.classList.add("weather-night");
      }
    }
  }, [weather]);

  return (
    <main className="">
      <div className="space-y-4 flex flex-col min-h-[91dvh]">
        {weather ? <WeatherCard weather={weather} /> : <p>Loading...</p>}
        {forecast ? <ForecastCard forecast={forecast} /> : <p>Loading...</p>}
      </div>
    </main>
  );
}

export default Homepage;
