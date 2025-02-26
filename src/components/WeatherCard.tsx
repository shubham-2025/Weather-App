import { FiSunrise, FiSunset } from "react-icons/fi";

function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="card p-4 ">
        <h1 className="text-3xl font-[600] text-center">{weather.name}</h1>
        <div className="flex max-md:flex-col text-center items-center justify-between gap-4">
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
            <p className="text-4xl font-[700] ">
              <span className="">{weather.main.temp}</span>
              °C
            </p>
            <p className="text-sm text-[var(--text-2)]">
              Feels like: {weather.main.feels_like}°C
            </p>
          </div>
        </div>
      </div>
      <div className="card p-4  divide-y-2 divide-gray-300 space-y-2">
        <h2>General Info:</h2>
        <div className="rounded-lg overflow-hidden  border-2 border-white">
          <table className="w-full">
            <tbody className="w-full divide-y-2 divide-white">
              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">H:</p>
                </td>
                <td className="text-[var(--text-2)]">{weather.main.temp_max}°C</td>
              </tr>
              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">L:</p>
                </td>
                <td className="text-[var(--text-2)]">{weather.main.temp_min}°C</td>
              </tr>
              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">Humidity:</p>
                </td>
                <td className="text-[var(--text-2)]">{weather.main.humidity}%</td>
              </tr>
              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">Visibility:</p>
                </td>
                <td className="text-[var(--text-2)]">
                  {weather.visibility / 1000} km
                </td>
              </tr>
              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">Pressure:</p>
                </td>
                <td className="text-[var(--text-2)]">{weather.main.pressure} hPa</td>
              </tr>

              <tr className="divide-x-2 divide-white">
                <td>
                  <p className="font-[700]">Wind Speed:</p>
                </td>
                <td className="text-[var(--text-2)]">{weather.wind.speed} m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className=" gap-4 grid grid-cols-2 place-items-center">
        <div className="card p-4 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <div>
              <p>Sunrise</p>
              <FiSunrise size={60} className="mx-auto text-yellow-300" />
            </div>
            <p className="font-[600] text-xl">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="card p-4 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            <div>
              <p>Sunset</p>
              <FiSunset size={60} className="mx-auto text-red-400" />
            </div>
            <p className="font-[600] text-xl">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
