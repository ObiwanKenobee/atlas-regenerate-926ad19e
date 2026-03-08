import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  confidence?: number;
  sparklineData?: number[];
  sourceType?: "satellite" | "field" | "model" | "community";
  className?: string;
}

const sourceLabels = {
  satellite: "Satellite Verified",
  field: "Field Sampled",
  model: "AI Modeled",
  community: "Community Reported",
};

export function MetricCard({
  title,
  value,
  unit,
  delta,
  deltaLabel = "vs last quarter",
  confidence,
  sparklineData,
  sourceType,
  className,
}: MetricCardProps) {
  const isPositive = delta && delta > 0;
  const isNegative = delta && delta < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl border border-border bg-card p-5 shadow-soft",
        "hover:shadow-elevated transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="data-label">{title}</span>
        {sourceType && (
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                <Info className="h-3 w-3 text-muted-foreground" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{sourceLabels[sourceType]}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="metric-value text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-3 h-8">
          <Sparkline data={sparklineData} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        {delta !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive && "text-verified",
              isNegative && "text-reversal",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp className="h-3.5 w-3.5" />}
            {isNegative && <TrendingDown className="h-3.5 w-3.5" />}
            {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5" />}
            <span>
              {isPositive && "+"}
              {delta}%
            </span>
            <span className="text-xs text-muted-foreground">{deltaLabel}</span>
          </div>
        )}

        {confidence !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <span
              className={cn(
                "confidence-badge",
                confidence >= 0.8 && "status-verified",
                confidence >= 0.6 && confidence < 0.8 && "status-fragile",
                confidence < 0.6 && "status-insufficient"
              )}
            >
              {confidence.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 100;
  const step = width / (data.length - 1);

  const points = data
    .map((val, i) => {
      const x = i * step;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const lastValue = data[data.length - 1];
  const firstValue = data[0];
  const trend = lastValue >= firstValue;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={trend ? "hsl(var(--verified))" : "hsl(var(--reversal))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
