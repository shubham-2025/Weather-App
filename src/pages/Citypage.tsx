import { useEffect } from "react";
import { useParams } from "react-router";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import { formatTimeWithTimezone, weatherBackgrounds } from "../utils/weather";
import { FaLocationDot } from "react-icons/fa6";

function Citypage() {
  const { city } = useParams();

  const {
    unit,
    fetchWeather,
    weather,
    forecast,
    fetchForecast,
    error,
    errorForecast,
    loading,
    loadingForecast,
  } = useWeather();

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city, unit]);

  useEffect(() => {
    if (weather) {
      const weatherCondition = weather.weather[0].description.toLowerCase();
      console.log(weatherCondition);
      console.log(weather.dt);

      const now = new Date(weather.dt * 1000);
      const sunsetTime = new Date(weather.sys.sunset * 1000);

      let background = "";
      if (
        weatherCondition.includes("clear sky") &&
        now.getTime() > sunsetTime.getTime()
      ) {
        background = "url('/night.webp')";
      } else {
        background =
          weatherBackgrounds[
            weatherCondition as keyof typeof weatherBackgrounds
          ] || "url('/clear-sky.webp')";
      }

      console.log(background);

      const bg = document.getElementById("bg");

      if (bg) {
        bg.style.backgroundImage = background;
        bg.style.backgroundSize = "cover";
        bg.style.backgroundPosition = "center";
      }

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
        if (now.getTime() > sunsetTime.getTime()) {
          document.body.classList.add("weather-night");
        } else document.body.classList.add("weather-sunny");
      } else if (weatherCondition.includes("cloud")) {
        document.body.classList.add("weather-cloudy");
      } else if (weatherCondition.includes("rain")) {
        document.body.classList.add("weather-rainy");
      } else if (
        weatherCondition.includes("mist") ||
        weatherCondition.includes("smoke") ||
        weatherCondition.includes("fog") ||
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

  if (loading && loadingForecast) {
    return (
      <main className="flex justify-center items-center min-h-screen text-white">
        <div className="loader"></div>
      </main>
    );
  }

  return (
    <main>
      <div id="bg" className="bg fixed bg-black inset-0 z-[-1]"></div>
      <div className="space-y-4">
        {weather && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <FaLocationDot size={30} className="inline" />
                <div>
                  <h1 className="text-3xl font-[600]">{weather.name}</h1>
                  <p className="text-[var(--text-2)] font-[700]">
                    {new Date(weather.dt * 1000).toLocaleDateString()}{" "}
                    {formatTimeWithTimezone(weather.dt, weather.timezone)}
                  </p>
                </div>
              </div>
            </div>
            <WeatherCard weather={weather} />
          </>
        )}
        {forecast && <ForecastCard forecast={forecast} />}
        {error && <div className="flex-1 card p-4 mb-2">{error}</div>}
        {errorForecast && (
          <div className="flex-1 card p-4 mt-2">{errorForecast}</div>
        )}
      </div>
    </main>
  );
}

export default Citypage;
