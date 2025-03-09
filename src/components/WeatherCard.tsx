import { FiSunrise, FiSunset } from "react-icons/fi";
import { formatTimeWithTimezone, weatherIcons } from "../utils/weather";
import { CiTempHigh } from "react-icons/ci";
import { WiDaySunny, WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FaGauge, FaWind, FaCloud, FaArrowUp } from "react-icons/fa6";
import { LuMoonStar } from "react-icons/lu";

function WeatherCard({ weather }: { weather: WeatherData }) {
  const weatherCondition = weather.weather[0].description.toLowerCase();
  let WeatherIcon = WiDaySunny;
  const now = new Date(weather.dt * 1000);
  const sunsetTime = new Date(weather.sys.sunset * 1000);

  if (weatherCondition === "clear sky" && now.getTime() > sunsetTime.getTime()) {
    WeatherIcon = LuMoonStar;
  } else {
    WeatherIcon = weatherIcons[weatherCondition as keyof typeof weatherIcons] || weatherIcons.default;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-poppins">
      {/* Main Weather Icon Card */}
      <div className="card p-6 lg:aspect-square bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg backdrop-blur-md">
        <div className="h-full flex flex-col justify-center items-center gap-4">
          <WeatherIcon size={120} className="text-white" />
          <p className="text-xl font-semibold">{weather.weather[0].description}</p>
        </div>
      </div>

      {/* Temperature Card */}
      <div className="card p-6 lg:aspect-square bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg">
        <div className="h-full flex flex-col justify-center items-center gap-3">
          <div className="flex items-center justify-center gap-4 text-gray-300 text-lg">
            <p>H: {weather.main.temp_max}°C</p>
            <p>L: {weather.main.temp_min}°C</p>
          </div>
          <p className="text-5xl font-extrabold">
            <CiTempHigh className="inline text-yellow-400" />
            {weather.main.temp}°C
          </p>
          <p className="text-md text-gray-300">Feels like: {weather.main.feels_like}°C</p>
        </div>
      </div>

      {/* Sunrise Card */}
      <div className="card p-6 w-full h-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl shadow-lg">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">Sunrise</p>
          <FiSunrise size={40} className="mx-auto text-yellow-300" />
          <p className="text-xl font-bold">{formatTimeWithTimezone(weather.sys.sunrise, weather.timezone)}</p>
        </div>
      </div>

      {/* Sunset Card */}
      <div className="card p-6 w-full h-full flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-700 text-white rounded-2xl shadow-lg">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">Sunset</p>
          <FiSunset size={40} className="mx-auto text-red-400" />
          <p className="text-xl font-bold">{formatTimeWithTimezone(weather.sys.sunset, weather.timezone)}</p>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[
          { label: "Humidity", value: `${weather.main.humidity}%`, icon: WiHumidity },
          { label: "Visibility", value: `${weather.visibility / 1000} km`, icon: MdVisibility },
          { label: "Pressure", value: `${weather.main.pressure} hPa`, icon: FaGauge },
          { label: "Wind Speed", value: `${weather.wind.speed} m/s`, icon: FaWind },
          { label: "Wind Direction", value: `${weather.wind.deg}°`, icon: FaArrowUp, rotate: weather.wind.deg },
          { label: "Cloudiness", value: `${weather.clouds.all}%`, icon: FaCloud },
        ].map((item, index) => (
          <div key={index} className="card p-6 aspect-square flex items-center justify-center flex-col gap-3 bg-gray-900 text-white rounded-2xl shadow-lg">
            <p className="text-gray-400">{item.label}</p>
            <div className={`${item.rotate ? "transform" : ""}`} style={{ transform: `rotate(${item.rotate || 0}deg)` }}>
              <item.icon size={40} className="text-white" />
            </div>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
