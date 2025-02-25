import { useEffect } from "react";
import { useParams } from "react-router";
import { useWeather } from "../hooks/useWeather";

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
      {weather ? (
        <div>
          <h1>{weather.name}</h1>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.feels_like}</p>
          <p>{weather.main.temp}</p>
          <p>{weather.main.humidity}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default Citypage;
