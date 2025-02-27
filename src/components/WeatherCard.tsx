import { FiSunrise, FiSunset } from "react-icons/fi";
import { formatTimeWithTimezone, weatherIcons } from "../utils/weather";
import { CiTempHigh } from "react-icons/ci";
import { WiDaySunny, WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FaGauge, FaWind, FaCloud, FaArrowUp } from "react-icons/fa6";
import { LuMoonStar } from "react-icons/lu";

function WeatherCard({
  weather,
  unit,
}: {
  weather: WeatherData;
  unit: "metric" | "imperial";
}) {
  // const { unit } = useWeather();

  const weatherCondition = weather.weather[0].description.toLowerCase();
  let WeatherIcon = WiDaySunny;
  const now = new Date(weather.dt * 1000);
  const sunsetTime = new Date(weather.sys.sunset * 1000);
  if (weatherCondition == "clear sky" && now.getTime() > sunsetTime.getTime()) {
    WeatherIcon = LuMoonStar;
  } else {
    WeatherIcon =
      weatherIcons[weatherCondition as keyof typeof weatherIcons] ||
      weatherIcons.default;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div className="card p-4 lg:aspect-square">
        <div className="h-full flex flex-col justify-center items-center gap-2">
          <div className="">
            {/* <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="mx-auto h-full w-full object-cover"
              /> */}
            <WeatherIcon size={120} className="text-white mx-auto" />
          </div>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="card p-4 lg:aspect-square">
        <div className="h-full flex flex-col justify-center items-center gap-2">
          <div className="flex items-center justify-center gap-4 text-[var(--text-2)]">
            <p className="">
              H: {weather.main.temp_max}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="">
              L: {weather.main.temp_min}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
          <p className="text-4xl font-[700] ">
            <CiTempHigh className="inline -mt-1" />
            <span className="">{weather.main.temp}</span>°
            {unit === "metric" ? "C" : "F"}
          </p>
          <p className="text-sm text-[var(--text-2)]">
            Feels like: {weather.main.feels_like}°
            {unit === "metric" ? "C" : "F"}
          </p>
        </div>
      </div>
      <div className="card p-4 w-full h-full flex items-center justify-center xl:col-start-4">
        <div className="space-y-8">
          <div className="text-center">
            <p className=" text-[var(--text-2)]">Sunrise</p>
            <p>
              <FiSunrise size={20} className="mx-auto text-yellow-300" />
            </p>
            <p className="font-[600]">
              {formatTimeWithTimezone(weather.sys.sunrise, weather.timezone)}
            </p>
          </div>
          <div className="text-center">
            <p className=" text-[var(--text-2)]">Sunset</p>
            <p>
              <FiSunset size={20} className="mx-auto text-red-400" />
            </p>
            <p className="font-[600]">
              {formatTimeWithTimezone(weather.sys.sunset, weather.timezone)}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Humidity</p>
          <WiHumidity className="" size={40} />
          <p className="font-[700]">{weather.main.humidity}%</p>
        </div>
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Visibility</p>
          <MdVisibility className="" size={40} />
          <p className="font-[700]">{weather.visibility / 1000} km</p>
        </div>
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Pressure</p>
          <FaGauge className="" size={40} />
          <p className="font-[700]">{weather.main.pressure} hPa</p>
        </div>
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Wind Speed</p>
          <FaWind className="" size={40} />
          <p className="font-[700]">
            {weather.wind.speed} {unit === "metric" ? "m/s" : "miles/hour"}
          </p>
        </div>
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Wind Direction</p>
          {/* <FaWind className="" size={40} /> */}
          <div
            style={{
              transform: `rotate(${weather.wind.deg}deg)`,
            }}
          >
            <FaArrowUp className="" size={40} />
          </div>
          <p className="font-[700]">{weather.wind.deg}°</p>
        </div>
        <div className="card p-4 aspect-square flex items-center justify-center flex-col gap-2">
          <p className="text-sm text-[var(--text-2)]">Cloudiness</p>
          <FaCloud className="" size={40} />
          <p className="font-[700]">{weather.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
