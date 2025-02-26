import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import { weatherBackgrounds } from "../utils/weather";
import { FaLocationDot } from "react-icons/fa6";

function Homepage() {
  const { address } = useGeolocation();
  const { unit, setUnit, fetchWeather, weather, forecast, fetchForecast } =
    useWeather();

  useEffect(() => {
    if (address) {
      fetchWeather("Nagpur");
      fetchForecast("Nagpur");
    }
  }, [address, unit]);

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
        {weather ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-[600] text-center">
                <FaLocationDot className="inline -mt-1" />
                {weather.name}
              </h1>
              <div className="flex border-2 border-white rounded-lg divide-x-2 divide-white overflow-hidden">
                <button
                  onClick={() => setUnit("metric")}
                  className={`py-1 px-2 cursor-pointer ${
                    unit === "metric" && "bg-white text-black font-[700]"
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`py-1 px-2 cursor-pointer ${
                    unit === "imperial" && "bg-white text-black font-[700]"
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>
            <WeatherCard weather={weather} unit={unit} />
          </>
        ) : (
          <p>Loading...</p>
        )}
        {forecast ? (
          <ForecastCard forecast={forecast} unit={unit} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default Homepage;
