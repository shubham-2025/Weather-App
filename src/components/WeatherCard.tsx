import { FiSunrise, FiSunset } from "react-icons/fi";

function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="card p-4 text-white">
        <h1 className="text-3xl font-[600]">{weather.name}</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="">
            <p className="flex flex-col items-center gap-2">
              <div className="w-[10rem] h-[10rem]">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                  className="mx-auto h-full w-full object-cover"
                />
              </div>
              {weather.weather[0].description}
            </p>
          </div>
          <div>
            <p className="text-5xl font-[700] ">{weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
          </div>
        </div>
      </div>
      <div className="card p-4 text-white grid grid-cols-2 grid-rows-5 gap-4">
        <p className="font-[700]">Humidity: </p>
        <p>{weather.main.humidity}%</p>
        <p className="font-[700]">Pressure:</p>
        <p>{weather.main.pressure} hPa</p>
        <p className="font-[700]">H: </p>
        <p>{weather.main.temp_max}°C</p>
        <p className="font-[700]">L: </p>
        <p>{weather.main.temp_min}°C</p>
        <p className="font-[700]">Wind Speed:</p>
        <p>{weather.wind.speed} m/s</p>
      </div>
      <div className="text-white gap-4 grid grid-cols-2 place-items-center">
        <div className="card p-4 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <div>
              <p>Sunrise</p>
              <FiSunrise size={60} className="mx-auto" />
            </div>
            <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="card p-4 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <div>
              <p>Sunset</p>
              <FiSunset size={60} className="mx-auto" />
            </div>
            <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
