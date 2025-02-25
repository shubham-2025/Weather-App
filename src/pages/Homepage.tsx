import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { useWeather } from "../hooks/useWeather";
import Searchbar from "../components/Searchbar";
import { getSearches } from "../utils/local";

function Homepage() {
  const { location, address } = useGeolocation();
  const { fetchWeather, weather, forecast, fetchForecast } = useWeather();
  useEffect(() => {
    if (address) {
      fetchWeather("Nagpur");
      fetchForecast("Nagpur");
    }
  }, [address]);

  useEffect(() => {
    console.log("SEARCH: ",getSearches());
  }, []);

  useEffect(() => {
    console.log(weather);
  }, [weather]);
  useEffect(() => {
    console.log(forecast);
  }, [forecast]);
  return (
    <main className="">
      <Searchbar />
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

export default Homepage;
