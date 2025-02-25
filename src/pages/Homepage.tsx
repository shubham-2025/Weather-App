import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useWeather } from "../hooks/useWeather";
import { getSearches } from "../utils/local";
import { FiSunrise, FiSunset } from "react-icons/fi";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";

function Homepage() {
  const { location, address } = useGeolocation();
  const { fetchWeather, weather, forecast, fetchForecast } = useWeather();
  useEffect(() => {
    if (address) {
      fetchWeather("Nagpur");
      fetchForecast("Nagpur");
    }
  }, [address]);

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
