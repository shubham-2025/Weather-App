import React from "react";

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Hourly Forecast (Next 24 Hours)
  const hourlyForecast = forecast.list
    .filter((item) => {
      const forecastTime = new Date(item.dt_txt).getTime();
      const now = Date.now();
      const hours = (forecastTime - now) / (1000 * 60 * 60);
      return hours >= 0 && hours <= 24;
    })
    .map((item) => ({
      time: new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(item.main.temp),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      description: item.weather[0].description,
    }));

  // 7-Day Forecast
  const dailyForecastMap = new Map();
  forecast.list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });
    if (!dailyForecastMap.has(date)) {
      dailyForecastMap.set(date, {
        day: date,
        temp: Math.round(item.main.temp),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        description: item.weather[0].description,
      });
    }
  });

  const dailyForecast = Array.from(dailyForecastMap.values()).slice(0, 7);

  return (
    <div className="flex flex-col space-y-4">
      {/* Hourly Forecast Card with Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-white">Hourly Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-2">
          {hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="card bg-white/20 backdrop-blur-lg border border-white/10 shadow-md p-4 rounded-lg text-center flex flex-col items-center"
            >
              <p className="text-sm font-bold text-white">{hour.time}</p>
              <img src={hour.icon} alt={hour.description} className="w-12 h-12" />
              <p className="text-md font-bold text-white">{hour.temp}°C</p>
              <p className="text-xs text-gray-300">{hour.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Card with Glassmorphism */}
      <div className=" bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-white">Next 7 Days Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 py-2">
          {dailyForecast.map((day, index) => (
            <div
              key={index}
              className="card bg-white/20 backdrop-blur-lg border border-white/10 shadow-md p-4 rounded-lg text-center flex flex-col items-center"
            >
              <p className="text-md font-bold text-white">{day.day}</p>
              <img src={day.icon} alt={day.description} className="w-14 h-14" />
              <p className="text-lg font-bold text-white">{day.temp}°C</p>
              <p className="text-sm text-gray-300">{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
