function ForecastCard({ forecast }: { forecast: ForecastData }) {
  return (
    <div className="card p-4 text-white flex-1">
      <h2 className="text-2xl font-bold">Forecast</h2>
      <div className="flex gap-2 overflow-x-auto py-4">
        {forecast.list
          .filter((item) => {
            const forecastTime = new Date(item.dt_txt).getTime();
            const now = Date.now();
            const diff = forecastTime - now;
            const hours = diff / (1000 * 60 * 60);
            return hours >= 0 && hours <= 48;
          })
          .map((item, index) => (
            <div key={index} className="f-card p-2">
              <h3 className="font-bold ">
                {new Date(item.dt_txt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />
              <p className="text-center">{item.main.temp}°C</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ForecastCard;
