import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipProps {
  active: boolean;
  payload: any[];
  unit: "metric" | "imperial";
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  unit,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="tp-card p-2 shadow-md rounded-md text-center">
        <img
          src={data.icon}
          alt={data.description}
          className="mx-auto w-10 h-5 object-cover"
        />
        <p className="text-black">
          {data.temp}
          {unit === "metric" ? "°C" : "°F"}
        </p>
        <p className="text-sm text-[var(--text-1)]">{data.description}</p>
      </div>
    );
  }
  return null;
};

function ForecastCard({
  forecast,
  unit,
}: {
  forecast: ForecastData;
  unit: "metric" | "imperial";
}) {
  const filteredData = forecast.list
    .filter((item) => {
      const forecastTime = new Date(item.dt_txt).getTime();
      const now = Date.now();
      const diff = forecastTime - now;
      const hours = diff / (1000 * 60 * 60);
      return hours >= 0 && hours <= 24;
    })
    .map((item) => ({
      time: new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: item.main.temp,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      description: item.weather[0].description,
    }));

  const CustomLabel = (props: any) => {
    const { x, y, index } = props;
    const icon = filteredData[index].icon;
    return (
      <image
        x={x - 16} // Adjust the position to center the icon above the point
        y={y - 34} // Adjust the position to place the icon above the point
        href={icon}
        width={30}
        height={30}
      />
    );
  };

  const rootStyles = getComputedStyle(document.documentElement);
  const xAxisLabelColor = rootStyles.getPropertyValue("--text-1").trim();
  const yAxisLabelColor = rootStyles.getPropertyValue("--text-1").trim();

  return (
    <div className="card p-4 text-white flex-1 divide-y-2 divide-gray-300 space-y-2">
      <h2 className="text-2xl font-bold">Forecast</h2>
      <div className="overflow-x-auto">
        <ResponsiveContainer width="100%" minHeight={400} minWidth={500}>
          <LineChart data={filteredData}>
            <XAxis dataKey="time" tick={{ fill: xAxisLabelColor }} />
            <YAxis
              domain={["auto", "auto"]}
              unit={unit === "metric" ? "°C" : "°F"}
              tick={{ fill: yAxisLabelColor }}
            />
            <Tooltip
              content={
                <CustomTooltip active={false} payload={[]} unit={unit} />
              }
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#7b4dfa"
              strokeWidth={2}
              label={<CustomLabel />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastCard;
