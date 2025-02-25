import { useEffect } from "react";
import "./App.css";
import useGeolocation from "./hooks/useGeolocation";
import { getWeather } from "./utils/weather";
import { useWeather } from "./hooks/useWeather";

function App() {
  const { location, address } = useGeolocation();
  const { fetchWeather, weather } = useWeather("Nagpur");
  useEffect(() => {
    if (address) {
      fetchWeather("Nagpur");
    }
  }, [address]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <main className="">
      {weather ? (
        <div>
          <h1>{weather.name}</h1>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;
