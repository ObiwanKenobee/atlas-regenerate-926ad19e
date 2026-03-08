import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts";

interface TrendData {
  month: string;
  actual: number;
  target: number;
  forecast?: number;
  lower?: number;
  upper?: number;
}

const mockTrendData: TrendData[] = [
  { month: "Jan", actual: 2400, target: 2600, lower: 2200, upper: 2600 },
  { month: "Feb", actual: 3200, target: 3000, lower: 2900, upper: 3500 },
  { month: "Mar", actual: 4100, target: 3400, lower: 3600, upper: 4600 },
  { month: "Apr", actual: 4800, target: 3800, lower: 4200, upper: 5400 },
  { month: "May", actual: 5200, target: 4200, lower: 4600, upper: 5800 },
  { month: "Jun", actual: 5800, target: 4600, lower: 5100, upper: 6500 },
  { month: "Jul", actual: 6400, target: 5000, lower: 5700, upper: 7100 },
  { month: "Aug", actual: 7200, target: 5400, lower: 6400, upper: 8000 },
  { month: "Sep", actual: 7800, target: 5800, lower: 6900, upper: 8700 },
  { month: "Oct", actual: 8600, target: 6200, forecast: 9200, lower: 7600, upper: 9600 },
  { month: "Nov", actual: undefined as unknown as number, target: 6600, forecast: 10100, lower: 8800, upper: 11400 },
  { month: "Dec", actual: undefined as unknown as number, target: 7000, forecast: 11200, lower: 9600, upper: 12800 },
];

interface TrendChartProps {
  title: string;
  unit?: string;
  data?: TrendData[];
}

export function TrendChart({ title, unit = "hectares", data = mockTrendData }: TrendChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{unit}</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-verified" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-muted-foreground" />
            <span className="text-muted-foreground">Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-water" />
            <span className="text-muted-foreground">Forecast</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--verified))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--verified))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--water))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--water))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            {/* Uncertainty band */}
            <Area
              dataKey="upper"
              stroke="none"
              fill="hsl(var(--muted))"
              fillOpacity={0.5}
            />
            <Area
              dataKey="lower"
              stroke="none"
              fill="hsl(var(--card))"
            />
            {/* Actual */}
            <Area
              dataKey="actual"
              stroke="hsl(var(--verified))"
              strokeWidth={2}
              fill="url(#actualGradient)"
              dot={false}
              connectNulls={false}
            />
            {/* Forecast */}
            <Area
              dataKey="forecast"
              stroke="hsl(var(--water))"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#forecastGradient)"
              dot={false}
            />
            {/* Target line */}
            <Line
              dataKey="target"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
