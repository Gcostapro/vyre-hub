import { LineChart, Line, ResponsiveContainer } from "recharts";
import { C, HEALTH_COLOR } from "../../lib/constants";

export function MiniChart({ data, health = 70, width = 80, height = 28 }) {
  const color = HEALTH_COLOR(health);
  const chartData = data.map((v, i) => ({ v, i }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
