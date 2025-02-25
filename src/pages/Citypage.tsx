import { useEffect } from "react";
import { useParams } from "react-router";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";

function Citypage() {
  const { city } = useParams();

  const { fetchWeather, weather, forecast, fetchForecast } = useWeather();
  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);
  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  return (
    <main className="">
      <div className="space-y-4">
        {weather ? <WeatherCard weather={weather} /> : <p>Loading...</p>}
        {forecast ? <ForecastCard forecast={forecast} /> : <p>Loading...</p>}
      </div>
    </main>
  );
}

export default Citypage;
