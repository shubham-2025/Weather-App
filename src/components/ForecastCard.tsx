import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from "recharts";

import { ScatterProps } from "recharts";

interface WeatherIconProps extends ScatterProps {
  cx?: number;
  cy?: number;
  payload?: {
    icon: string;
    description: string;
  };
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  cx = 0,
  cy = 0,
  payload,
}) => {
  if (!payload) return null; // Safety check

  return (
    <foreignObject x={cx - 12} y={cy - 40} width="24" height="24">
      <img
        src={payload.icon}
        alt={payload.description}
        width="24"
        height="24"
        style={{ pointerEvents: "none" }} // Prevents interaction issues
      />
    </foreignObject>
  );
};

interface CustomTooltipProps {
  active: boolean;
  payload: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="card p-2 shadow-md rounded-md text-center">
        <img
          src={data.icon}
          alt={data.description}
          className="mx-auto w-10 h-5 object-cover"
        />
        <p className="text-black">{data.temp}°C</p>
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>
    );
  }
  return null;
};

function ForecastCard({ forecast }: { forecast: ForecastData }) {
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

  return (
    <div className="card p-4 text-white flex-1">
      <h2 className="text-2xl font-bold">Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} unit="°C" />
          <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#7b4dfa"
            strokeWidth={2}
          />
          <Scatter data={filteredData} dataKey="temp" shape={<WeatherIcon />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastCard;
